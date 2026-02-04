# Vision

Vision is a personal desktop hub that encapsulates the small apps I use day to day. It is built with Electron + React + Vite and stores data locally in a SQLite database.

## What It Is

- A single desktop app that acts as a container for multiple personal tools
- Offline-first, with local storage via SQLite
- Easy to extend: each module lives under `src/apps/*`

## Tech Stack

- Electron (main process + preload)
- React + Vite (renderer)
- SQLite via `better-sqlite3`
- Tailwind CSS

## Project Structure

- `src/main.ts` – Electron main process
- `src/preload/preload.ts` – secure renderer API bridge
- `src/renderer.tsx` – React entry point
- `src/apps/` – feature modules (current: `idea`)
- `src/database/` – SQLite setup and migrations

## Local Development

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run the app locally

```bash
npm start
```

Electron Forge will start Vite dev servers and open the desktop window.

## Packaging

```bash
npm run package
```

This uses Electron Forge and generates an executable appropriate to your OS automatically.

## Data Storage

The SQLite database lives in Electron’s user data directory as `vision.db`.

## Extending the App

To add a new module:

- Create a folder under `src/apps/<module-name>`
- Add main-process logic under `src/apps/<module-name>/main`
- Add renderer UI under `src/apps/<module-name>/renderer`
- Expose module APIs in `src/preload/api` and register IPC handlers

## Status

This is an early-stage personal tool. Expect rapid changes and minimal polish.

## License

MIT
