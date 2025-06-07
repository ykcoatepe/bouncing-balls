# Bouncing Balls

A simple 3D animation that simulates dozens of balls bouncing inside a rotating hexagonal prism. It is built with [Three.js](https://threejs.org/) and bundled using [Vite](https://vitejs.dev/).

## Prerequisites

- Node.js 18 or later. The project includes an [.nvmrc](.nvmrc) file for use with
  [nvm](https://github.com/nvm-sh/nvm) or compatible tools.

## Setup

Run the setup script to install dependencies and verify the Node.js version:

```bash
./setup.sh
```

After setup, start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`.

## Build

To create a production build, run:

```bash
npm run build
```

The optimized files are output to the `dist/` directory. Preview the build locally with:

```bash
npm run preview
```

## PyCharm

This project can be opened in **PyCharm** (Professional or Community with the Node.js plugin). After cloning the repository:

1. Open the project directory in PyCharm.
2. Ensure a Node.js interpreter is configured under **Settings \| Languages & Frameworks \| Node.js**.
3. Run `npm install` from the built-in terminal.
4. Create an **npm** run configuration for the `dev` script or run `npm run dev` directly in the terminal.

PyCharm will launch the Vite development server and open the app in your browser.

## Dependencies

The project relies on the following packages:

- `three` – renders the scene.
- `vite` – development server and build tool.
- `eslint` – development linter.
- `prettier` – development code formatter.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

