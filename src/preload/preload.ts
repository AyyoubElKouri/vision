/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { contextBridge } from "electron";

import { ideasApi } from "./api/ideas.api";

const api = {
	ideas: ideasApi,
} as const;

contextBridge.exposeInMainWorld("api", api);

export type ElectronApi = typeof api;
