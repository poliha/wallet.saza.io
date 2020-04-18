#! /bin/bash
set -e



echo "Building production release ..."
ng build --prod --base-href ./

echo "Making electron build ..."
electron-forge make
