curl \
 -F "status=2" \
 -F "notify=0" \
 -F "dsym=@./client/platforms/ios/build/emulator/Urban\ Refuge.app.dSYM.zip" \
 -H "X-HockeyAppToken: $HockeyAppToken" \
 https://rink.hockeyapp.net/api/2/apps/$iOSAppId_Dev/app_versions/upload