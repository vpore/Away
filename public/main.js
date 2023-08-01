const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");

const database = require("./database");
const db = new database("database.json");

let win;
function createWindow() {

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  win.loadURL("http://localhost:3000");

  win.webContents.openDevTools();
}

app.whenReady().then( () => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) { createWindow(); }
    });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("toElectron", (_, args) => {
  const { pathname, body } = JSON.parse(args);
  const json = (data) => win.webContents.send("fromElectron", JSON.stringify(data));

  if (pathname === "set") {
    Object.keys(body).forEach((key) => db.set(key, body[key]));
    db.commit();

    json({ body });
  } else if (pathname === "get") {
    json(db.data);
  }
});