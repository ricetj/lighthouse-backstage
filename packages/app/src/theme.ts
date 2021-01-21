import { createTheme, lightTheme } from '@backstage/theme';

export const customTheme = createTheme({
  defaultPageTheme: 'home',
  palette: lightTheme.palette,
  fontFamily: 'Comic Sans MS',
});