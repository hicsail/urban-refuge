# Urban Refuge
Mobile app to locate non-governmental organizations and service providers for non-camp, urban refugees living in Amman, Jordan.

## CircleCI and HockeyApp Integration
 ### Command Line Helper / Options
 The shell script used to upload a new version of the app to HockeyApp is a simple curl command and can be
   found in the android_deploy.sh file. The documentation for this command can be found at 
   [How to Upload To HockeyApp](https://support.hockeyapp.net/kb/client-integration-ios-mac-os-x-tvos/how-to-upload-to-hockeyapp-from-mac-os-x).
 
### Environment Variables
The environment variables used in in the curl command can be found by loging into [CircleCi](https://circleci.com/dashboard)\> 
gear icon next to your project \> 
Environment Variables.  
The AndroidAppId_Dev variable corresponds with the App ID of the HockeyApp. The HockeyAppToken variable corresponds with
an API token that can be found and created in the Account Settings of the HockeyApp account.