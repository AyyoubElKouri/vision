import { contextBridge } from "electron";

import { ideasApi } from "./api/ideas.api";

const api = {
  ideas: ideasApi,
} as const;

contextBridge.exposeInMainWorld("api", api);

export type ElectronApi = typeof api;