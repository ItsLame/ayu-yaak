import type { PluginDefinition } from '@yaakapp/api';
import { makeAyuTheme } from './makeTheme';

/**
 * The ayu color scheme for Yaak.
 *
 * Six themes: Light, Mirage, and Dark — each in a default (borderless)
 * presentation and a "Bordered" presentation. Borderless variants use the
 * unsuffixed ids and are listed first as the default presentation.
 */
export const plugin: PluginDefinition = {
  themes: [
    makeAyuTheme('light', { bordered: false }),
    makeAyuTheme('mirage', { bordered: false }),
    makeAyuTheme('dark', { bordered: false }),
    makeAyuTheme('light', { bordered: true }),
    makeAyuTheme('mirage', { bordered: true }),
    makeAyuTheme('dark', { bordered: true }),
  ],
};
