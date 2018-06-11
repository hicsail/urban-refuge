# Urban Refuge

## Installation instructions
```
npm install -g cordova // to install cordova
npm install -g ionic // to install ionic

cd client // to go to the root directory
npm install // to install all dependencies

ionic cordova platform add android // to add android platform
ionic cordova platform add ios // to add ios platform
ionic cordova emulate android // to emulate in android emulator
ionic cordova emulate ios // to emulate in ios emulator

ionic cordova build android // to generate .apk file
ionic cordova build ios // to generate for ios

ionic lab // to emulate in all 3 platforms (Android, IOS, Windows) in the browser
```

## Feature list
- Android mobile app used to find aid based on GPS locations.
- Receives verified aid locations with filters from Urban Refuge backend server.
- Able to view each aid location, description, and call them for more information.
- All text is available in English and in Arabic.
