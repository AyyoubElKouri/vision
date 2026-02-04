import { ipcMain } from "electron";

import { AppCore } from "../../../composition-root";
import { CreateIdeaDto } from "../contracts/idea.contract";

export function registerIdeasIpc(core: AppCore) {
  ipcMain.handle("ideas:getAll", () => core.ideas.getAllIdeas());
  ipcMain.handle("ideas:create", (_event, input: CreateIdeaDto) => core.ideas.createIdea(input));
}
