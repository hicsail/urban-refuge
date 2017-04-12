curl \
 -F "status=2" \
 -F "notify=0" \
 -F "ipa=@./platforms/android/build/outputs/apk/android-debug.apk" \
 $HockeyAppToken \
 https://rink.hockeyapp.net/api/2/apps/673c4da2dda442c3b81568b9d2c114dd/app_versions/upload