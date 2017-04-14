curl \
 -F "status=2" \
 -F "notify=0" \
 -F "ipa=@./platforms/android/build/outputs/apk/android-debug.apk" \
 -H "X-HockeyAppToken: $HockeyAppToken" \
 https://rink.hockeyapp.net/api/2/apps/$AndroidAppId_Dev/app_versions/upload
