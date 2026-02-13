/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { IdeasService } from "@/apps/ideas/application/ideas.service";
import { IdeasSqliteRepository } from "@/apps/ideas/infrastructure/database/ideas.sqlite.repository";

import { PlansService } from "@/apps/plans/application/plans.service";
import { PlansSqliteRepository } from "@/apps/plans/infrastructure/database/plans.sqlite.repository";

import { getDatabase, getSqliteDriver } from "@/database/database";
import { runMigrations } from "@/database/migrations/migrate";

export type ApplicationCore = {
	ideas: IdeasService;
  plans: PlansService;
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

	// Ideas
	const ideasRepository = new IdeasSqliteRepository(db);
	const ideasService = new IdeasService(ideasRepository);

	// Plans
  const plansRepository = new PlansSqliteRepository();
  const plansService = new PlansService(plansRepository);

	return {
		ideas: ideasService,
    plans: plansService,
	};
}
