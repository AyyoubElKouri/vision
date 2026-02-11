/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * @type {Idea}
 * This type represents the idea entity in the domain layer.
 * 
 * @property {number} id - The unique identifier of the idea.
 * @property {string} title - The title of the idea.
 * @property {string} description - The description of the idea.
 * @property {number} number - The number of the idea, used for ordering.
 * @property {Date} createdAt - The date when the idea was created.
 */
export type Idea = {
  id: number;
  title: string;
  description: string;
  number: number;
  createdAt: Date;
}