import type { Theme, ThemeComponentColors, ThemeComponents } from '@yaakapp/api';
import { AYU, type AyuPalette, type AyuVariantName } from './palette';

export interface MakeThemeOptions {
  /**
   * When true, major chrome panels get visible dividers (the "Bordered"
   * presentation). When false, borders stay barely-there so panels blend.
   */
  bordered: boolean;
}

const LABELS: Record<AyuVariantName, string> = {
  light: 'Ayu Light',
  mirage: 'Ayu Mirage',
  dark: 'Ayu Dark',
};

/** Top-level colors, shared by both presentations of a variant. */
function baseColors(p: AyuPalette, bordered: boolean): ThemeComponentColors {
  return {
    surface: p.surfaceBase,
    surfaceHighlight: p.editorLine,
    surfaceActive: p.uiSelection,
    text: p.editorFg,
    textSubtle: p.uiFg,
    textSubtlest: p.comment,
    // Bordered draws visible dividers; borderless keeps them barely-there.
    border: bordered ? p.uiLine : p.indentGuide,
    borderSubtle: p.indentGuide,
    borderFocus: p.accent,
    shadow: p.panelShadow,
    backdrop: p.backdrop,
    selection: p.editorSelection,
    primary: p.accent,
    secondary: p.uiFg,
    info: p.entity,
    success: p.vcsAdded,
    notice: p.accent,
    warning: p.keyword,
    danger: p.error,
  };
}

/** The editor pane uses ayu's lifted editor background + foreground. */
function editorColors(p: AyuPalette): ThemeComponentColors {
  return {
    surface: p.editorBg,
    text: p.editorFg,
    selection: p.editorSelection,
  };
}

/**
 * Component overrides. The editor pane is always tuned to ayu's editor tokens.
 * In bordered mode the major chrome panels also get a visible divider so the
 * sidebar, app header, and response pane read as clearly separated.
 */
function components(p: AyuPalette, bordered: boolean): ThemeComponents {
  const base: ThemeComponents = { editor: editorColors(p) };
  if (!bordered) return base;

  const panel: ThemeComponentColors = { surface: p.surfaceBase, border: p.uiLine };
  return {
    ...base,
    sidebar: panel,
    appHeader: panel,
    responsePane: panel,
  };
}

/**
 * Build a single ayu `Theme` for the given variant and presentation.
 *
 * ids are stable and kebab-case, namespaced with an `ayu-colors-` prefix so
 * they never collide with Yaak's built-in `themes-yaak` ayu themes (which use
 * `ayu-light`/`ayu-mirage`/`ayu-dark`). The `-bordered` suffix marks the
 * bordered presentation; borderless keeps the plain variant id.
 */
export function makeAyuTheme(
  variant: AyuVariantName,
  { bordered }: MakeThemeOptions,
): Theme {
  const p = AYU[variant];
  return {
    id: bordered ? `ayu-colors-${variant}-bordered` : `ayu-colors-${variant}`,
    label: bordered ? `${LABELS[variant]} Bordered` : LABELS[variant],
    dark: p.dark,
    base: baseColors(p, bordered),
    components: components(p, bordered),
  };
}
