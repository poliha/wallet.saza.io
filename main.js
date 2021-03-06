// electron main file
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800, height: 600, webPreferences: {
      devTools: false,
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/www/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// quit app when all windows are closed on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});