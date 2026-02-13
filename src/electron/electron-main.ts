/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import path from "node:path";
import { app, BrowserWindow } from "electron";
import started from "electron-squirrel-startup";
import { bootstrap } from "./bootstrap";
import { registerMain } from "./register-app";
import type { IdeasAPI } from "@/apps/ideas/application/ideas.api";
import type { PlansAPI } from "@/apps/plans/application/plans.api";

// Hide chromium logs
app.commandLine.appendSwitch("log-level", "3");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}

	// Remove menu bar
	mainWindow.setMenu(null);
};

/**-------------------------------------------------------------------------------------------------
 * 
 *         Registers the app's APIs and creates the main window when Electron is ready.
 * 
 -------------------------------------------------------------------------------------------------*/
app.whenReady().then(() => {
	const core = bootstrap();
	registerMain<IdeasAPI>("ideas", core.ideas);
  registerMain<PlansAPI>("plans", core.plans);

	createWindow();

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
