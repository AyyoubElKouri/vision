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
