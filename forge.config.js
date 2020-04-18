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
      results.map(({ artifacts }) => artifacts).flat().forEach(result => console.log(result));
    }
  }
}