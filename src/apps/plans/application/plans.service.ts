/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { PlansRepository } from "../domain/plans.repository";
import type { PlansAPI } from "./plans.api";

/**
 * @class PlansService
 *
 * Application service that orchestrates plans operations.
 * Delegates persistence to the injected repository.
 */
export class PlansService implements PlansAPI {
  constructor(private readonly repository: PlansRepository) {}

  async hello(): Promise<string> {
    return this.repository.hello();
  }
}
