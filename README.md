# Mobilit GTFS Analyzer

Open source educational GTFS analyzer built with React, Vite, Node.js and TypeScript.

The goal of this project is to learn how GTFS works by exploring real public transport datasets step by step.

---

## Features

- Upload a GTFS `.zip`
- Extract and inspect GTFS files
- Parse CSV datasets
- Explore:
  - routes
  - stops
  - trips
  - stop times
  - calendars
- Understand GTFS relationships visually

---

## Tech Stack

### Frontend

- React
- Vite
- TypeScript

### Backend

- Node.js
- Express
- TypeScript

---

## Project Structure

```txt
mobilit-gtfs-analyzer/
├─ src/                # React frontend
├─ backend/            # Node.js API
│  ├─ src/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ utils/
│  │  └─ types/
├─ README.md