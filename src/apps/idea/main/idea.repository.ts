import { SqliteDb } from "../../../database/database";
import { CreateIdeaDto } from "../contracts/idea.contract";
import { Idea } from "./idea.model";

/**
 * Repository for managing ideas in the SQLite database.
 */
export class IdeaRepository {
  constructor(private readonly db: SqliteDb) {}

  getAll(): Idea[] {
    return this.db
      .prepare(
        `SELECT
          id,
          number,
          title,
          description,
          created_at as createdAt
        FROM ideas
        ORDER BY number`
      )
      .all() as Idea[];
  }

  create(input: CreateIdeaDto): { id: number } {
    const result = this.db
      .prepare("INSERT INTO ideas(number, title, description) VALUES (?, ?, ?)")
      .run(input.number, input.title, input.description);

    return { id: Number(result.lastInsertRowid) };
  }
}
