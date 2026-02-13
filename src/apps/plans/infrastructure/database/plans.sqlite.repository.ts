/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { PlansRepository } from "@/apps/plans/domain/plans.repository";

/**
 * SQLite implementation of the PlansRepository.
 *
 * Currently returns a simple hello world message for testing purposes.
 * Replace with real database operations once the schema is configured.
 */
export class PlansSqliteRepository implements PlansRepository {
  async hello(): Promise<string> {
    return "Hello World from Plans!";
  }
}
