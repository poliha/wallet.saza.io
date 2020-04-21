#! /bin/bash
set -e

source .env

UNSIGNED_APK="platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
VERSION=`node -pe "require('./package.json').version"`
RELEASE_FILE=saza-v$VERSION.apk


[[ -z "$SAZA_KEYSTORE" ]] && { echo "Error: SAZA_KEYSTORE not found"; exit 1; }

[[ -z "$SAZA_KEYSTORE_ALIAS" ]] && { echo "Error: SAZA_KEYSTORE_ALIAS not found"; exit 1; }


echo "Building production release ..."
ionic cordova build android --prod --release

echo "Signing apk ..."
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $SAZA_KEYSTORE $UNSIGNED_APK $SAZA_KEYSTORE_ALIAS

echo "Run zipalign on apk ..."
~/Android/Sdk/build-tools/29.0.3/zipalign -f -v 4 $UNSIGNED_APK $RELEASE_FILE

echo "Android production build completed..."
ls -alh $RELEASE_FILE