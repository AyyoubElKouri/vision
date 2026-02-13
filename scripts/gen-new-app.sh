#!/usr/bin/env bash  

#---------------------------------------------------------------------------------------------------
#                      Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
#      Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
#---------------------------------------------------------------------------------------------------

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

# File header injected into every generated source file
HEADER="/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/"

# Validate input
if [ $# -eq 0 ]; then
  echo -e "${RED}Error:${RESET} Please provide an app name."
  echo -e "${DIM}Usage: ./scripts/gen-new-app.sh <app-name>${RESET}"
  exit 1
fi

RAW_NAME="$1"

# Validate format: lowercase letters, numbers, and hyphens only
if [[ ! "$RAW_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo -e "${RED}Error:${RESET} App name must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens."
  exit 1
fi

# Derive naming variants (e.g. "my-app" -> PascalCase: "MyApp", camelCase: "myApp")
SINGULAR="$RAW_NAME"

# PascalCase
PASCAL_CASE=""
IFS='-' read -ra PARTS <<< "$SINGULAR"
for part in "${PARTS[@]}"; do
  PASCAL_CASE+="$(tr '[:lower:]' '[:upper:]' <<< "${part:0:1}")${part:1}"
done

# camelCase
CAMEL_CASE="${PARTS[0]}"
for (( i=1; i<${#PARTS[@]}; i++ )); do
  part="${PARTS[$i]}"
  CAMEL_CASE+="$(tr '[:lower:]' '[:upper:]' <<< "${part:0:1}")${part:1}"
done

# First letter uppercase (used as placeholder icon label)
FIRST_LETTER="$(tr '[:lower:]' '[:upper:]' <<< "${SINGULAR:0:1}")"

# Resolve paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
APP_DIR="$PROJECT_ROOT/src/apps/$SINGULAR"

if [ -d "$APP_DIR" ]; then
  echo -e "${RED}Error:${RESET} App ${BOLD}$SINGULAR${RESET} already exists at ${DIM}$APP_DIR${RESET}"
  exit 1
fi

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${CYAN}║${RESET}  ${BOLD}Generating new app: ${GREEN}$SINGULAR${RESET}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""

# Create directory structure
echo -e "${DIM}Creating directory structure...${RESET}"

mkdir -p "$APP_DIR/application"
mkdir -p "$APP_DIR/domain"
mkdir -p "$APP_DIR/infrastructure/database"
mkdir -p "$APP_DIR/presentation/components"

# -- Domain layer --
echo -e "${DIM}Generating domain layer...${RESET}"

# Entity
cat > "$APP_DIR/domain/$SINGULAR.entity.ts" << EOF
$HEADER

/**
 * @type {${PASCAL_CASE}}
 * This type represents the ${SINGULAR} entity in the domain layer.
 *
 * @property {number} id - The unique identifier.
 */
export type ${PASCAL_CASE} = {
  id: number;
};
EOF

# Repository interface
cat > "$APP_DIR/domain/$SINGULAR.repository.ts" << EOF
$HEADER

/**
 * @interface ${PASCAL_CASE}Repository
 *
 * This interface defines the contract for the ${SINGULAR} repository,
 * it will be implemented by the infrastructure layer to interact with the database.
 */
export interface ${PASCAL_CASE}Repository {
  /**
   * Returns a hello world message.
   * @returns A promise that resolves to a greeting string.
   */
  hello(): Promise<string>;
}
EOF

# -- Application layer --
echo -e "${DIM}Generating application layer...${RESET}"

# API interface
cat > "$APP_DIR/application/$SINGULAR.api.ts" << EOF
$HEADER

/**
 * @interface ${PASCAL_CASE}API
 * ${PASCAL_CASE}API defines the interface for the ${SINGULAR} application layer.
 */
export interface ${PASCAL_CASE}API {
  /**
   * Returns a hello world greeting.
   * @returns a greeting string.
   */
  hello: () => Promise<string>;
}
EOF

# Service
cat > "$APP_DIR/application/$SINGULAR.service.ts" << EOF
$HEADER

import type { ${PASCAL_CASE}Repository } from "../domain/$SINGULAR.repository";
import type { ${PASCAL_CASE}API } from "./$SINGULAR.api";

/**
 * @class ${PASCAL_CASE}Service
 *
 * Application service that orchestrates ${SINGULAR} operations.
 * Delegates persistence to the injected repository.
 */
export class ${PASCAL_CASE}Service implements ${PASCAL_CASE}API {
  constructor(private readonly repository: ${PASCAL_CASE}Repository) {}

  async hello(): Promise<string> {
    return this.repository.hello();
  }
}
EOF

# -- Infrastructure layer --
echo -e "${DIM}Generating infrastructure layer...${RESET}"

# Schema (placeholder)
cat > "$APP_DIR/infrastructure/database/$SINGULAR.schema.ts" << EOF
$HEADER

// TODO: Define your Drizzle schema here.
// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
//
// export const ${CAMEL_CASE}s = sqliteTable("${SINGULAR}s", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
// });
EOF

# SQLite repository
cat > "$APP_DIR/infrastructure/database/$SINGULAR.sqlite.repository.ts" << EOF
$HEADER

import type { ${PASCAL_CASE}Repository } from "@/apps/$SINGULAR/domain/$SINGULAR.repository";

/**
 * SQLite implementation of the ${PASCAL_CASE}Repository.
 *
 * Currently returns a simple hello world message for testing purposes.
 * Replace with real database operations once the schema is configured.
 */
export class ${PASCAL_CASE}SqliteRepository implements ${PASCAL_CASE}Repository {
  async hello(): Promise<string> {
    return "Hello World from ${PASCAL_CASE}!";
  }
}
EOF

# -- Presentation layer --
echo -e "${DIM}Generating presentation layer...${RESET}"

# Icon component
cat > "$APP_DIR/presentation/$SINGULAR.icon.tsx" << EOF
$HEADER

/**
 * ${PASCAL_CASE} app icon for the sidebar.
 */
export function ${PASCAL_CASE}Icon({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <div className="relative group flex items-center">
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer hover:opacity-80 active:scale-95 transition-all"
      >
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>${PASCAL_CASE} Icon</title>
          <rect
            x="0.25"
            y="0.25"
            width="44.5"
            height="44.5"
            rx="3.75"
            fill="#1A1E19"
          />
          <rect
            x="0.25"
            y="0.25"
            width="44.5"
            height="44.5"
            rx="3.75"
            stroke={selected ? "#ffffffff" : "#363636"}
            strokeWidth="0.5"
          />
          {/* TODO: Replace with your own icon SVG path */}
          <text
            x="22.5"
            y="26"
            textAnchor="middle"
            fill="#687069"
            fontSize="16"
            fontWeight="bold"
          >
            ${FIRST_LETTER}
          </text>
        </svg>
      </button>

      {label ? (
        <div className="pointer-events-none absolute left-13.5 top-1/2 -translate-y-1/2 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
          <span className="px-2 py-1 text-[11px] tracking-[0.2em] uppercase bg-[#111010] border border-[#363636] text-[#D4D4D4] rounded">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
EOF

# Page component
cat > "$APP_DIR/presentation/$SINGULAR.page.tsx" << EOF
$HEADER

import { useEffect, useState } from "react";

/**
 * Main page component for the ${PASCAL_CASE} app.
 */
export function ${PASCAL_CASE}Page() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    window.api.${CAMEL_CASE}
      .hello()
      .then(setMessage)
      .catch(() => setMessage("Failed to load"));
  }, []);

  return (
    <div className="w-full h-full text-white p-6 flex flex-col gap-6 overflow-auto">
      <header>
        <h1 className="text-2xl font-semibold text-white/80">${PASCAL_CASE}</h1>
        <p className="text-sm font-medium text-white/50 mb-2">
          {message || "Loading..."}
        </p>
        <div className="w-full h-px bg-white/20" />
      </header>
    </div>
  );
}
EOF

# Empty components directory placeholder
touch "$APP_DIR/presentation/components/.gitkeep"

# -- Output: success summary and manual integration steps --
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${GREEN}║${RESET}  ${BOLD}✔ App ${CYAN}$SINGULAR${RESET}${BOLD} generated successfully!${RESET}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "${BOLD}Generated structure:${RESET}"
echo -e "${DIM}  src/apps/$SINGULAR/${RESET}"
echo -e "${DIM}  ├── application/${RESET}"
echo -e "${DIM}  │   ├── $SINGULAR.api.ts${RESET}"
echo -e "${DIM}  │   └── $SINGULAR.service.ts${RESET}"
echo -e "${DIM}  ├── domain/${RESET}"
echo -e "${DIM}  │   ├── $SINGULAR.entity.ts${RESET}"
echo -e "${DIM}  │   └── $SINGULAR.repository.ts${RESET}"
echo -e "${DIM}  ├── infrastructure/${RESET}"
echo -e "${DIM}  │   └── database/${RESET}"
echo -e "${DIM}  │       ├── $SINGULAR.schema.ts${RESET}"
echo -e "${DIM}  │       └── $SINGULAR.sqlite.repository.ts${RESET}"
echo -e "${DIM}  └── presentation/${RESET}"
echo -e "${DIM}      ├── $SINGULAR.icon.tsx${RESET}"
echo -e "${DIM}      ├── $SINGULAR.page.tsx${RESET}"
echo -e "${DIM}      └── components/${RESET}"
echo ""
echo -e "${YELLOW}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${YELLOW}║${RESET}  ${BOLD}⚠  Manual steps required to complete the integration${RESET}"
echo -e "${YELLOW}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "${BOLD}1. Update ${CYAN}src/electron/preload.ts${RESET}"
echo -e "   Register the renderer API for your new app:"
echo ""
echo -e "   ${DIM}import type { ${PASCAL_CASE}API } from \"@/apps/$SINGULAR/application/$SINGULAR.api\";${RESET}"
echo -e "   ${DIM}const ${CAMEL_CASE}Api = registerRenderer<${PASCAL_CASE}API>(\"$SINGULAR\");${RESET}"
echo ""
echo -e "   Then add ${CYAN}${CAMEL_CASE}: ${CAMEL_CASE}Api${RESET} to the ${BOLD}api${RESET} object."
echo ""
echo -e "${BOLD}2. Update ${CYAN}src/electron/bootstrap.ts${RESET}"
echo -e "   Wire up the repository and service:"
echo ""
echo -e "   ${DIM}import { ${PASCAL_CASE}Service } from \"@/apps/$SINGULAR/application/$SINGULAR.service\";${RESET}"
echo -e "   ${DIM}import { ${PASCAL_CASE}SqliteRepository } from \"@/apps/$SINGULAR/infrastructure/database/$SINGULAR.sqlite.repository\";${RESET}"
echo ""
echo -e "   Inside ${BOLD}bootstrap()${RESET}:"
echo -e "   ${DIM}const ${CAMEL_CASE}Repository = new ${PASCAL_CASE}SqliteRepository();${RESET}"
echo -e "   ${DIM}const ${CAMEL_CASE}Service = new ${PASCAL_CASE}Service(${CAMEL_CASE}Repository);${RESET}"
echo ""
echo -e "   Add ${CYAN}${CAMEL_CASE}: ${CAMEL_CASE}Service${RESET} to the ${BOLD}ApplicationCore${RESET} type and return object."
echo ""
echo -e "${BOLD}3. Update ${CYAN}src/electron/electron-main.ts${RESET}"
echo -e "   Register the main process API:"
echo ""
echo -e "   ${DIM}import type { ${PASCAL_CASE}API } from \"@/apps/$SINGULAR/application/$SINGULAR.api\";${RESET}"
echo -e "   ${DIM}registerMain<${PASCAL_CASE}API>(\"$SINGULAR\", core.${CAMEL_CASE});${RESET}"
echo ""
echo -e "${BOLD}4. Configure the database schema${RESET}"
echo -e "   The generated repository currently returns a simple hello message."
echo -e "   When you're ready to use the real database:"
echo -e "   ${DIM}• Edit ${CYAN}src/apps/$SINGULAR/infrastructure/database/$SINGULAR.schema.ts${RESET}"
echo -e "   ${DIM}• Create a migration SQL in ${CYAN}src/database/migrations/${RESET}"
echo -e "   ${DIM}• Update the repository to inject Db and use Drizzle ORM (like IdeasSqliteRepository)${RESET}"
echo ""
echo -e "${BOLD}5. Add to the shell UI ${CYAN}(optional)${RESET}"
echo -e "   ${DIM}• Add \"$SINGULAR\" to the RouteId type in ${CYAN}src/shell/navigation.store.ts${RESET}"
echo -e "   ${DIM}• Import the icon & page in ${CYAN}src/shell/app.tsx${RESET}"
echo -e "   ${DIM}• Add the icon to the Sidebar and a case in getContentForRoute()${RESET}"
echo ""
echo -e "${GREEN}Happy coding! 🚀${RESET}"
echo ""
