using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using UrbanRefuge.Web.Controllers;

namespace UrbanRefuge.Web.Authorization
{
    public class AdminEmailHandler : AuthorizationHandler<AdminEmailRequirement>
    {
        private readonly IOptions<AdminEmails> _optionsAccessor;

        public AdminEmailHandler(IOptions<AdminEmails> optionsAccessor)
        {
            _optionsAccessor = optionsAccessor;
        }


        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminEmailRequirement requirement)
        {
            Claim userEmail = context.User.Claims.FirstOrDefault(x => x.Type == "emails");
            if (userEmail?.Value == null)
            {
                return Task.FromResult(0);
            }

            if (_optionsAccessor?.Value?.Emails == null)
            {
                return Task.FromResult(0);
            }

            if (_optionsAccessor.Value.Emails.Contains(userEmail.Value))
            {
                context.Succeed(requirement);
            }

            return Task.FromResult(0);
        }
    }
}