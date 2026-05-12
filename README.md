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
```

---

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:3001
```

---

## Roadmap

### Backend

- [ ] GTFS zip upload
- [ ] Zip extraction
- [ ] CSV parser utilities
- [ ] GTFS dataset validation
- [ ] Routes analyzer
- [ ] Stops analyzer
- [ ] Trips analyzer
- [ ] Calendar analyzer

### Frontend

- [ ] Upload interface
- [ ] Dataset explorer
- [ ] Route viewer
- [ ] Stop viewer
- [ ] GTFS relationship visualization
- [ ] Modern educational UI

---

## Educational Goal

This repository is intentionally designed as a clean and readable “school of dev” project.

The objective is not only to build a GTFS analyzer, but also to demonstrate:

- clean architecture
- scalable TypeScript structure
- readable code
- GTFS understanding
- modern frontend/backend separation

---

## About

This project is inspired by the work done around the Mobilit ecosystem and GTFS interpretation experiments.

It focuses on education, experimentation and public transport open data exploration.

---

## License

MIT