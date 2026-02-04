/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { create } from "zustand";

export type RouteId = "idea" | "notes" | "settings" | "test";

interface NavStore {
	route: RouteId;
	setRoute: (r: RouteId) => void;
}

export const useNavStore = create<NavStore>((set) => ({
	route: "idea",
	setRoute: (route) => set({ route }),
}));
