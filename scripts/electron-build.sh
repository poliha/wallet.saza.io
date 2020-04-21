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
npm run build:prod

echo "Making electron build ..."
npm run electron:make
