/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { ipcMain, ipcRenderer } from "electron";

// biome-ignore lint/suspicious/noExplicitAny: <Compatibility with dynamic actions>
type AsyncAPI = (...args: any[]) => Promise<any>;

/**
 * Collects all method names from an object, including inherited prototype methods.
 * Excludes the constructor.
 */
function getMethodNames(obj: object): string[] {
	const methods = new Set<string>();
	let current = obj;

	while (current && current !== Object.prototype) {
		for (const key of Object.getOwnPropertyNames(current)) {
			if (key !== "constructor" && typeof (obj as Record<string, unknown>)[key] === "function") {
				methods.add(key);
			}
		}
		current = Object.getPrototypeOf(current);
	}

	return [...methods];
}

/**
 * Registers an app in the main process, and makes its actions available
 * in the renderer process via the preload script.
 *
 * Handles both plain objects and class instances by walking the prototype chain
 * to discover all methods. Each method is bound to the original instance so
 * `this` is preserved.
 *
 * @param name of the app, used as a prefix for the ipc channels.
 * @param api the object (or class instance) whose methods to register.
 */
export function registerMain<T extends object>(name: string, api: T): void {
	const keys = getMethodNames(api);

	// Expose method names so registerRenderer can discover them synchronously.
	ipcMain.on(`${name}:__methods__`, (event) => {
		event.returnValue = keys;
	});

	// Register each method as an async IPC handler, bound to the original instance.
	for (const key of keys) {
		const method = (api as Record<string, AsyncAPI>)[key].bind(api);
		ipcMain.handle(`${name}:${key}`, (_event, ...args) => method(...args));
	}
}

/**
 * Creates a typed API object for the renderer process.
 *
 * Returns a plain object with real enumerable function properties,
 * safe for contextBridge.exposeInMainWorld. Each function delegates
 * to ipcRenderer.invoke with the matching channel.
 *
 * Usage in preload:
 *   registerRenderer<IdeasAPI>("ideas")
 *
 * The method names are discovered automatically by querying the main
 * process via a synchronous IPC call.
 *
 * @param name of the app, used as a prefix for the ipc channels.
 * @returns a typed object that mirrors the main process API.
 */
export function registerRenderer<T extends object>(name: string): T {
	const keys = ipcRenderer.sendSync(`${name}:__methods__`) as string[];

	const api = {} as Record<string, unknown>;
	for (const key of keys) {
		api[key] = (...args: unknown[]) => ipcRenderer.invoke(`${name}:${key}`, ...args);
	}

	return api as T;
}
