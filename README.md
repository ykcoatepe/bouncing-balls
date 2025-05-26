# Hexagonal Prism Bouncing Balls

This project is a small demo built with [Three.js](https://threejs.org/) and Vite. It renders a rotating hexagonal prism filled with bouncing balls. The scene is displayed in the browser using WebGL.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be served locally and reload on changes.
3. Create a production build:
   ```bash
   npm run build
   ```
   The compiled files will be placed in the `dist` directory.

## Project Structure

- `index.html` – main HTML entry point.
- `src/` – application JavaScript and styles.
- `public/` – static assets copied as-is.
- `vite.config.mjs` – Vite configuration.

## Purpose

This repository demonstrates basic physics and rendering using Three.js. Balls move under gravity and bounce inside a rotating hexagonal prism, showing collision detection, lighting and animation techniques.

