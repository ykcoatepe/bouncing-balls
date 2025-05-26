# Bouncing Balls

This demo uses Vite with Rollup. On some systems npm may try to install native
modules for other platforms which prevents the build from running.

If `npm run build` fails with an error about a missing `@rollup/rollup-*`
module, reinstall dependencies without optional native packages:

```bash
npm install --omit=optional
```

This updates `package-lock.json` and removes the unused native modules. After
that `npm run build` should work as expected.

