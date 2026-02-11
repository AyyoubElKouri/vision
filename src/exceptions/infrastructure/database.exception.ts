/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * Exception thrown when database operations fail.
 */
export class DatabaseException extends Error {
	/**
	 * The original error that caused this database exception, if any.
	 */
	public readonly cause?: Error;

	/**
	 * Creates a new DatabaseException.
	 * @param message A descriptive message about the database error
	 * @param cause The original error that caused this exception, if any
	 */
	constructor(message: string, cause?: Error) {
		super(message);
		this.name = "DatabaseException";
		this.cause = cause;

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DatabaseException);
		}
	}
}
