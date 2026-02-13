/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * @interface PlansAPI
 * PlansAPI defines the interface for the plans application layer.
 */
export interface PlansAPI {
  /**
   * Returns a hello world greeting.
   * @returns a greeting string.
   */
  hello: () => Promise<string>;
}
