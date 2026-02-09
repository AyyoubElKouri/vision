/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { IdeaRepository } from "./apps/idea/main/idea.repository";
import { IdeaService } from "./apps/idea/main/idea.service";
import { getDatabase, getSqliteDriver } from "./database/database";
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
	const sqlite = getSqliteDriver();
	runMigrations(sqlite);

	const db = getDatabase();

	const ideaRepository = new IdeaRepository(db);

	return {
		ideas: new IdeaService(ideaRepository),
	};
}
