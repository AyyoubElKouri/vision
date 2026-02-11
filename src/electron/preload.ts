/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { contextBridge } from "electron";
import type { IdeasAPI } from "@/apps/ideas/application/ideas.api";
import { registerRenderer } from "./register-app";

/**
 * Expose APIs to the renderer process by registering them 
 * with the same name as in the main process.
 */

const ideasApi = registerRenderer<IdeasAPI>("ideas");

const api = {
	ideas: ideasApi,
} as const;

contextBridge.exposeInMainWorld("api", api);

export type ElectronApi = typeof api;
