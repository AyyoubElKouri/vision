/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * Exception thrown when a requested resource is not found.
 */
export class NotFoundException extends Error {
	/**
	 * The resource that was not found.
	 */
	public readonly resource: string;

	/**
	 * The identifier of the resource that was not found.
	 */
	public readonly identifier?: string | number;

	/**
	 * Creates a new NotFoundException.
	 * @param resource The name of the resource that was not found (e.g., "idea", "user")
	 * @param identifier The identifier of the resource that was not found (optional)
	 */
	constructor(resource: string, identifier?: string | number) {
		const message = identifier
			? `${resource} with identifier '${identifier}' was not found`
			: `${resource} was not found`;

		super(message);
		this.name = "NotFoundException";
		this.resource = resource;
		this.identifier = identifier;

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NotFoundException);
		}
	}
}
