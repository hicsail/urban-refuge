using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using UrbanRefuge.Web.Models;
using Microsoft.EntityFrameworkCore;
using UrbanRefuge.Web.Authorization;
using UrbanRefuge.Web.Controllers;

namespace UrbanRefuge.Web
{
    public class Startup
    {
        public static string SignInPolicyId;
        public static string ProfilePolicyId;
        public static string ClientId;
        public static string RedirectUri;
        public static string AadInstance;
        public static string Tenant;

        private static bool _isDevEnvironment;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            _isDevEnvironment = env.IsDevelopment();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            services.Configure<MvcOptions>(options =>
            {
                if (!_isDevEnvironment)
                {
                    options.Filters.Add(new RequireHttpsAttribute());
                }
            });

            services.AddAuthentication(sharedOptions => sharedOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin",
                                  policy => policy.Requirements.Add(new AdminEmailRequirement()));
            });

            services.AddSingleton<IAuthorizationHandler, AdminEmailHandler>();


            var connection = Configuration["ConnectionStrings:UrbanRefugeDB"];
            services.AddDbContext<RefugeResourceContext>(options => options.UseSqlServer(connection));

            services.AddCloudscribePagination();


            services.AddOptions();

            services.Configure<AdminEmails>(Configuration);
            services.Configure<AdminEmails>(Configuration.GetSection("AdminEmails"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();

                // work around for seeding data. https://github.com/aspnet/EntityFramework/issues/5786
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    serviceScope.ServiceProvider.GetService<RefugeResourceContext>().Database.Migrate();
                    serviceScope.ServiceProvider.GetService<RefugeResourceContext>().EnsureSeedData();
                }
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    serviceScope.ServiceProvider.GetService<RefugeResourceContext>().Database.Migrate();
                    serviceScope.ServiceProvider.GetService<RefugeResourceContext>().EnsureSeedData();
                }
            }

            

            // App config settings
            ClientId = Configuration["AzureAD:ClientId"];
            AadInstance = Configuration["AzureAD:AadInstance"];
            Tenant = Configuration["AzureAD:Tenant"];
            RedirectUri = Configuration["AzureAD:RedirectUri"];
            SignInPolicyId = Configuration["AzureAD:PolicyName"];

            // Authentication for MVC using cookies
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationScheme = CookieAuthenticationDefaults.AuthenticationScheme,
                AutomaticAuthenticate = true,
                LoginPath = "/Account/SignIn"
            });
            app.UseOpenIdConnectAuthentication(CreateOptionsFromPolicy(SignInPolicyId));

            // Authentication using JWT tokens for api
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AuthenticationScheme = "Bearer",
                AutomaticAuthenticate = false,
                AutomaticChallenge = true,
                Audience = ClientId,
                ConfigurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                   metadataAddress: string.Format(AadInstance, Tenant, SignInPolicyId),
                   configRetriever: new OpenIdConnectConfigurationRetriever(),
                   docRetriever: new HttpDocumentRetriever() { RequireHttps = false })
            });

            app.UseStaticFiles();

            app.UseMvcWithDefaultRoute();
        }

        private OpenIdConnectOptions CreateOptionsFromPolicy(string policy)
        {
            policy = policy.ToLower();
            return new OpenIdConnectOptions
            {
                AutomaticAuthenticate = false,
                // For each policy, give OWIN the policy-specific metadata address, and
                // set the authentication type to the id of the policy
                MetadataAddress = string.Format(AadInstance, Tenant, policy),
                AuthenticationScheme = policy,
                CallbackPath = new PathString(string.Format("/{0}", policy)),

                // These are standard OpenID Connect parameters, with values pulled from config.json
                ClientId = ClientId,
                PostLogoutRedirectUri = RedirectUri,
                Events = new OpenIdConnectEvents
                {
                    OnRemoteFailure = RemoteFailure,
                },
                ResponseType = OpenIdConnectResponseType.IdToken,
            };
        }

        // Used for avoiding yellow-screen-of-death
        private Task RemoteFailure(FailureContext context)
        {
            context.HandleResponse();
            if (context.Failure is OpenIdConnectProtocolException && context.Failure.Message.Contains("access_denied"))
            {
                context.Response.Redirect("/");
            }
            else
            {
                context.Response.Redirect("/Home/Error?message=" + context.Failure.Message);
            }

            return Task.FromResult(0);
        }
    }
}
