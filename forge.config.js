const fs = require('fs');
const path = require('path');

module.exports = {
  packagerConfig: {
    "dir": "./www"
  },
  makers: [
    {
      "name": "@electron-forge/maker-zip",
    }
  ],
  hooks: {
    postMake: (_, results) => {

      const builds = results.map(({ artifacts }) => artifacts).flat();
      try {
        for (const build of builds) {
          const destination = path.resolve('./dist', path.basename(build))
          fs.copyFileSync(build, destination)
          console.log(`copied: ${build} => ${destination}`);
        }

        console.log('All files copied to ./dist');

      } catch (error) {
        console.error(error)
      }

    }
  }
}