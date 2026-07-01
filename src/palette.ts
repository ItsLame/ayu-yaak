/**
 * Raw ayu color tokens, resolved to hex, for each variant.
 *
 * Source of truth: https://github.com/ayu-theme/ayu-colors (Light, Mirage, Dark).
 * 8-digit values carry alpha (`#RRGGBBAA`) and are used only for overlay-style
 * slots (selection, subtle borders, shadows) that composite over a surface;
 * opaque hex is used for surfaces and text.
 */

export type AyuVariantName = 'light' | 'mirage' | 'dark';

export interface AyuPalette {
  /** true => dark appearance, false => light appearance */
  dark: boolean;
  /** signature ayu accent (orange/gold) */
  accent: string;
  /** error / danger red */
  error: string;
  /** UI chrome background (sidebar, header) */
  surfaceBase: string;
  /** lifted content background (editor pane) */
  surfaceLift: string;
  /** editor pane background */
  editorBg: string;
  /** editor foreground / primary text */
  editorFg: string;
  /** current-line highlight */
  editorLine: string;
  /** active editor selection */
  editorSelection: string;
  /** normal indent guide — used as a subtle border */
  indentGuide: string;
  /** muted UI foreground (icons, secondary text) */
  uiFg: string;
  /** UI divider / border line */
  uiLine: string;
  /** panel background */
  panelBg: string;
  /** panel drop shadow */
  panelShadow: string;
  /** active UI selection highlight */
  uiSelection: string;
  /** comment gray — subtlest text */
  comment: string;
  /** entity blue — info */
  entity: string;
  /** keyword orange — warning */
  keyword: string;
  /** vcs added green — success */
  vcsAdded: string;
  /** modal backdrop overlay */
  backdrop: string;
}

export const AYU: Record<AyuVariantName, AyuPalette> = {
  light: {
    dark: false,
    accent: '#F29718',
    error: '#E65050',
    surfaceBase: '#F8F9FA',
    surfaceLift: '#FCFCFC',
    editorBg: '#FCFCFC',
    editorFg: '#5C6166',
    editorLine: '#828E9F1A',
    editorSelection: '#035BD626',
    indentGuide: '#828E9F2E',
    uiFg: '#828E9F',
    uiLine: '#6B7D8F1F',
    panelBg: '#FAFAFA',
    panelShadow: '#6B7D8F12',
    uiSelection: '#6B7D8F24',
    comment: '#ADAEB1',
    entity: '#22A4E6',
    keyword: '#FA8532',
    vcsAdded: '#6CBF43',
    backdrop: '#00000040',
  },
  mirage: {
    dark: true,
    accent: '#FFCC66',
    error: '#FF6666',
    surfaceBase: '#1F2430',
    surfaceLift: '#242936',
    editorBg: '#242936',
    editorFg: '#CCCAC2',
    editorLine: '#1A1F29',
    editorSelection: '#409FFF40',
    indentGuide: '#707A8C3B',
    uiFg: '#707A8C',
    uiLine: '#171B24',
    panelBg: '#282E3B',
    panelShadow: '#00000033',
    uiSelection: '#63759926',
    comment: '#6E7C8F',
    entity: '#73D0FF',
    keyword: '#FFA659',
    vcsAdded: '#87D96C',
    backdrop: '#00000099',
  },
  dark: {
    dark: true,
    accent: '#E6B450',
    error: '#D95757',
    surfaceBase: '#0D1017',
    surfaceLift: '#10141C',
    editorBg: '#10141C',
    editorFg: '#BFBDB6',
    editorLine: '#161A24',
    editorSelection: '#3388FF40',
    indentGuide: '#5A637842',
    uiFg: '#5A6378',
    uiLine: '#1B1F29',
    panelBg: '#141821',
    panelShadow: '#00000080',
    uiSelection: '#47526640',
    comment: '#5A6673',
    entity: '#59C2FF',
    keyword: '#FF8F40',
    vcsAdded: '#70BF56',
    backdrop: '#00000099',
  },
};
