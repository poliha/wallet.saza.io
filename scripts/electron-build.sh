#! /bin/bash
set -e

if [ -d "./dist" ] 
then
    echo "Removing dist directory from previous build ..." 
    rm -rf dist
fi

echo "Making dist directory ..."
mkdir dist


echo "Building production release ..."
ng build --prod --base-href ./

echo "Making electron build ..."
node_modules/@electron-forge/cli/dist/electron-forge.js make
