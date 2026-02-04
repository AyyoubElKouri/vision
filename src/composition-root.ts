import { IdeaRepository } from "./apps/idea/main/idea.repository";
import { IdeaService } from "./apps/idea/main/idea.service";
import { openDatabase } from "./database/database";
import { runMigrations } from "./database/migrations/migrate";

export type AppCore = {
	ideas: IdeaService;
};

/**
 * Creates and initializes the application core.
 *
 * @returns {AppCore} The initialized application core.
 */
export function createAppCore(): AppCore {
	const db = openDatabase();
	runMigrations(db);

	const ideaRepository = new IdeaRepository(db);

	return {
		ideas: new IdeaService(ideaRepository),
	};
}
