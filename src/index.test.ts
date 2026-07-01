import { describe, expect, it } from 'vitest';
import { plugin } from './index';
import { AYU } from './palette';

const themes = plugin.themes ?? [];

describe('ayu theme plugin', () => {
  it('registers exactly six themes', () => {
    expect(themes).toHaveLength(6);
  });

  it('has unique, ayu-colors-namespaced ids (no collision with built-ins)', () => {
    const ids = themes.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^ayu-colors-/);
    }
    // Must not reuse Yaak's bundled ayu ids.
    for (const builtin of ['ayu-light', 'ayu-mirage', 'ayu-dark']) {
      expect(ids).not.toContain(builtin);
    }
  });

  it('exposes the expected labels', () => {
    expect(themes.map((t) => t.label).sort()).toEqual(
      [
        'Ayu Dark',
        'Ayu Dark Bordered',
        'Ayu Light',
        'Ayu Light Bordered',
        'Ayu Mirage',
        'Ayu Mirage Bordered',
      ].sort(),
    );
  });

  it('lists borderless variants first', () => {
    expect(themes.slice(0, 3).map((t) => t.id)).toEqual([
      'ayu-colors-light',
      'ayu-colors-mirage',
      'ayu-colors-dark',
    ]);
  });

  it('sets dark flags correctly (Light=light, Mirage/Dark=dark)', () => {
    const dark = (id: string) => themes.find((t) => t.id === id)?.dark;
    expect(dark('ayu-colors-light')).toBe(false);
    expect(dark('ayu-colors-light-bordered')).toBe(false);
    expect(dark('ayu-colors-mirage')).toBe(true);
    expect(dark('ayu-colors-dark')).toBe(true);
    expect(dark('ayu-colors-dark-bordered')).toBe(true);
  });

  it('gives every theme non-empty base colors', () => {
    for (const t of themes) {
      expect(t.base.surface).toBeTruthy();
      expect(t.base.text).toBeTruthy();
      expect(t.base.primary).toBeTruthy();
    }
  });

  it('drives primary/notice/borderFocus from the ayu accent', () => {
    for (const t of themes) {
      const variant = t.id.replace('ayu-colors-', '').replace('-bordered', '') as
        | 'light'
        | 'mirage'
        | 'dark';
      const accent = AYU[variant].accent;
      expect(t.base.primary).toBe(accent);
      expect(t.base.notice).toBe(accent);
      expect(t.base.borderFocus).toBe(accent);
    }
  });

  it('only bordered themes carry panel border overrides', () => {
    for (const t of themes) {
      const bordered = t.id.endsWith('-bordered');
      const c = t.components ?? {};
      // editor override is always present
      expect(c.editor?.surface).toBeTruthy();
      if (bordered) {
        for (const panel of [c.sidebar, c.appHeader, c.responsePane]) {
          expect(panel?.border).toBeTruthy();
        }
      } else {
        expect(c.sidebar).toBeUndefined();
        expect(c.appHeader).toBeUndefined();
        expect(c.responsePane).toBeUndefined();
      }
    }
  });
});
