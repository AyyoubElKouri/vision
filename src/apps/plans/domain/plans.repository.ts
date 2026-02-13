/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * @interface PlansRepository
 *
 * This interface defines the contract for the plans repository,
 * it will be implemented by the infrastructure layer to interact with the database.
 */
export interface PlansRepository {
  /**
   * Returns a hello world message.
   * @returns A promise that resolves to a greeting string.
   */
  hello(): Promise<string>;
}
