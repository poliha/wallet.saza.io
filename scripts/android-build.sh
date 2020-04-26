#! /bin/bash
set -e

source .env

UNSIGNED_APK="platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
UNSIGNED_AAB="platforms/android/app/build/outputs/bundle/release/app.aab"
VERSION=`node -pe "require('./package.json').version"`
RELEASE_VERSION=saza-v$VERSION
AAB_RELEASE_FILE=$RELEASE_VERSION.aab
APK_RELEASE_FILE=$RELEASE_VERSION.apk


[[ -z "$SAZA_KEYSTORE" ]] && { echo "Error: SAZA_KEYSTORE not found"; exit 1; }

[[ -z "$SAZA_KEYSTORE_ALIAS" ]] && { echo "Error: SAZA_KEYSTORE_ALIAS not found"; exit 1; }


echo "Building production release ..."
ionic cordova build android --prod --release

echo "Build android app bundle aab ... "
cd platforms/android/
./gradlew bundle

cd ../..

if [[ "$SIGN_SAZA_RELEASE" = "false" ]] 
then
    echo "Not signing release ..." 
    cp $UNSIGNED_APK $APK_RELEASE_FILE
else
    echo "Signing apk ..."
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $SAZA_KEYSTORE $UNSIGNED_APK $SAZA_KEYSTORE_ALIAS

    echo "Signing aab ..."
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $SAZA_KEYSTORE $UNSIGNED_AAB $SAZA_KEYSTORE_ALIAS

    echo "Run zipalign on apk ..."
    ~/Android/Sdk/build-tools/29.0.3/zipalign -f -v 4 $UNSIGNED_APK $APK_RELEASE_FILE
fi


cp $UNSIGNED_AAB $AAB_RELEASE_FILE

echo "Android production build completed..."
ls -alh $RELEASE_VERSION*