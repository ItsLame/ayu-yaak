# Ayu Themes for Yaak

The [ayu](https://github.com/ayu-theme/ayu-colors) color scheme as a theme plugin for
[Yaak](https://yaak.app), the desktop API client. Provides the full ayu family — **Light**,
**Mirage**, and **Dark** — each in a default (borderless) and a **Bordered** presentation,
mirroring the ayu VS Code theme.

## Themes

| Theme (label)         | id                          | Appearance |
| --------------------- | --------------------------- | ---------- |
| Ayu Light             | `ayu-colors-light`          | Light      |
| Ayu Mirage            | `ayu-colors-mirage`         | Dark       |
| Ayu Dark              | `ayu-colors-dark`           | Dark       |
| Ayu Light Bordered    | `ayu-colors-light-bordered` | Light      |
| Ayu Mirage Bordered   | `ayu-colors-mirage-bordered`| Dark       |
| Ayu Dark Bordered     | `ayu-colors-dark-bordered`  | Dark       |

### Bordered vs borderless

Both presentations use the exact same ayu colors — they differ only in panel dividers:

- **Borderless** (default): the sidebar, app header, and response pane blend into the base
  surface with barely-there borders, for a clean, seamless look.
- **Bordered**: those same panels get visible dividers so each area reads as clearly
  separated — matching ayu's "Bordered" VS Code variants.

Pick whichever you prefer from Yaak's theme picker.

> **Note:** Yaak ships its own basic Ayu Light/Mirage/Dark via a built-in plugin. This
> plugin uses `ayu-colors-…` ids so it coexists with those built-ins without conflict. If
> you see duplicate "Ayu Light/Mirage/Dark" entries, you're seeing both — you can ignore or
> hide the built-in ones.

## Colors

Colors are derived from the upstream [`ayu-theme/ayu-colors`](https://github.com/ayu-theme/ayu-colors)
palette (Light, Mirage, Dark) and mapped onto Yaak's theme color slots. The signature ayu
accent drives the app's `primary` color; status colors (`info`, `success`, `warning`,
`danger`) come from ayu's blue / green / keyword-orange / error hues.

## Install

### From the Yaak plugin registry (once published)

In Yaak: **Settings → Plugins**, search for **Ayu Themes**, and install. Then open the theme
picker and choose an ayu theme.

### Locally (development)

```bash
npm install          # install dependencies
npm run build        # bundle to build/index.js
# or, for live-reload while editing:
npm run dev          # yaakcli dev — rebuilds on change
```

Then in Yaak: **Settings → Plugins → Install Plugin** and point it at this plugin folder.
Yaak watches the folder and hot-reloads on each rebuild.

> **Requirement:** the Yaak plugin CLI (`yaakcli`, bundled here as a dev dependency)
> requires **Node.js ≥ 24**. `npm run build` / `npm run dev` invoke it via `npx`.

## Scripts

| Script            | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run build`   | Bundle the plugin to `build/index.js`         |
| `npm run dev`     | Watch mode with hot-reload (`yaakcli dev`)    |
| `npm test`        | Run the vitest suite                          |
| `npm run typecheck` | Type-check with `tsc --noEmit`              |

## Project layout

```
src/
  palette.ts      # raw ayu hex values per variant (source of truth)
  makeTheme.ts    # makeAyuTheme(variant, { bordered }) -> Yaak Theme
  index.ts        # assembles the six themes and exports `plugin`
  index.test.ts   # vitest structural checks
build/index.js    # bundled output (generated)
```

## Publishing

Publishing to the Yaak plugin registry (see the
[Yaak plugin docs](https://yaak.app/docs)):

1. Register a namespace at
   [yaak.app/plugins/namespaces/manage](https://yaak.app/plugins/namespaces/manage) and set
   `package.json` `name` to `@{your-namespace}/ayu-yaak` (the current `@itslame/…` is a
   placeholder — replace it with your registered namespace).
2. Ensure `package.json` has `name`, `displayName`, and `version`, and that `README.md`
   exists (all present).
3. Authenticate and publish:
   ```bash
   npx yaakcli login     # browser-based auth against the registry
   npx yaakcli publish   # publish the current version
   ```

## License

MIT
