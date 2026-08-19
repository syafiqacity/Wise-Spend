/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#17202b', tint: '#5b4ee8', background: '#f5f7fb', foreground: '#17202b',
    card: '#ffffff', cardForeground: '#17202b', primary: '#5b4ee8', primaryForeground: '#ffffff',
    secondary: '#ecebff', secondaryForeground: '#4539bd', muted: '#eef1f6', mutedForeground: '#718096',
    accent: '#dff7ee', accentForeground: '#20795c', destructive: '#d95959', destructiveForeground: '#ffffff',
    border: '#e2e7ef', input: '#e2e7ef', success: '#3db78a', warning: '#efa84b', info: '#5c9ee8',
  },
  dark: {
    text: '#f4f6fb', tint: '#9a91ff', background: '#121522', foreground: '#f4f6fb',
    card: '#1d2232', cardForeground: '#f4f6fb', primary: '#8b82ff', primaryForeground: '#17152e',
    secondary: '#2d2a56', secondaryForeground: '#d9d6ff', muted: '#252b3a', mutedForeground: '#aab2c3',
    accent: '#173f36', accentForeground: '#8de0bc', destructive: '#ed8585', destructiveForeground: '#291414',
    border: '#303749', input: '#303749', success: '#62d2a8', warning: '#f4be69', info: '#80b9f0',
  },
  radius: 18,
};

export default colors;
