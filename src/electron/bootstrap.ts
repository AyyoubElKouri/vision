/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { IdeasService } from "@/apps/ideas/application/ideas.service";
import { IdeasSqliteRepository } from "@/apps/ideas/infrastructure/database/ideas.sqlite.repository";
import { getDatabase, getSqliteDriver } from "@/database/database";
import { runMigrations } from "@/database/migrations/migrate";

export type ApplicationCore = {
	ideas: IdeasService;
};

/**
 * Bootstraps the application core (dependency injection container).
 *
 * @returns {ApplicationCore} The initialized application core.
 */
export function bootstrap(): ApplicationCore {
	// Infrastructure
	const sqlite = getSqliteDriver();
	runMigrations(sqlite);

	const db = getDatabase();

	// Repositories
	const ideasRepository = new IdeasSqliteRepository(db);

	// Services
	const ideasService = new IdeasService(ideasRepository);

	return {
		ideas: ideasService,
	};
}
