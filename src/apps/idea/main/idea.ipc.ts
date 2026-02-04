import { ipcMain } from "electron";

import type { AppCore } from "../../../composition-root";
import type { CreateIdeaDto } from "../contracts/idea.contract";

export function registerIdeasIpc(core: AppCore) {
	ipcMain.handle("ideas:getAll", () => core.ideas.getAllIdeas());
	ipcMain.handle("ideas:create", (_event, input: CreateIdeaDto) =>
		core.ideas.createIdea(input),
	);
}
