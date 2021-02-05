import React from 'react';
import { AppTheme } from '@backstage/core';
import { createMuiTheme, ThemeOptions, Theme } from '@material-ui/core';
import {
  createThemeOverrides,
  genPageTheme,
  BackstageTheme,
  PageTheme,
  PageThemeSelector,
  BackstagePalette,
} from '@backstage/theme';
import LightIcon from '@material-ui/icons/WbSunny';

/**
 * THEME OPTIONS
 */
const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    background: {
      default: '#f9f9f9', // background for entire website
      paper: '#f9f9f9', // small square components used across the pages
    },
    primary: {
      main: '#0071bb', // selected menu and create component button
      light: '#0071bb',
      dark: '#0071bb',
      contrastText: '#fff',
    },
  },
  props: {
    MuiGrid: {
      spacing: 2,
    },
    MuiSwitch: {
      color: 'primary',
    },
  },
  typography: {
    fontFamily: [
      '"Source Sans Pro"',
      '"Helvetica Neue"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
      fontSize: 28,
      marginBottom: 6,
    },
    h3: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 6,
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      marginBottom: 8,
    },
    h1: {
      fontSize: 54,
      fontWeight: 700,
      marginBottom: 10,
    },
    button: {
      fontWeight: 700,
    },
  },
};

const muiTheme: Theme = createMuiTheme(themeOptions);

/**
 * BASE THEME (Default MUI overrides and Additional Palette types)
 */
const palette: BackstagePalette = {
  ...muiTheme.palette,
  status: {
    ok: '#1DB954',
    warning: '#FF9800',
    error: '#E22134',
    running: '#2E77D0',
    pending: '#FFED51',
    aborted: '#757575',
  },
  bursts: {
    fontColor: '#FEFEFE',
    slackChannelText: '#ddd',
    backgroundColor: {
      default: '#7C3699',
    },
  },
  banner: {
    info: '#0071bb',
    error: '#E22134',
    text: '#FFFFFF',
    link: '#9bdaf1',
  },
  border: '#E6E6E6',
  textContrast: '#000000', // main text and column on focus
  textVerySubtle: '#DDD',
  textSubtle: '#6E6E6E', // secondary column titles in table
  highlight: '#FFFBCC',
  errorBackground: '#FFEBEE',
  warningBackground: '#F59B23',
  infoBackground: '#ebf5ff',
  errorText: '#CA001B',
  infoText: '#004e8a',
  warningText: '#FEFEFE',
  linkHover: '#2196F3',
  link: '#0A6EBE',
  gold: '#ffd600',
  navigation: {
    // left collapsible navigation
    background: '#323a45',
    indicator: '#fac922',
    color: '#fff',
    selectedColor: '#fac922',
  },
  pinSidebarButton: {
    icon: '#181818',
    background: '#BDBDBD',
  },
  tabbar: {
    indicator: '#9BF0E1',
  },
};

/**
 * PAGE BANNERS
 */
const pageBanners: Record<string, PageTheme> = {
  home: genPageTheme(
    ['#112e51', '#112e51'],
    `url("data:image/svg+xml,%3Csvg%20width%3D%221368%22%20height%3D%22118%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%3E%3Ctitle%3Ebackground%3C%2Ftitle%3E%3Crect%20fill%3D%22none%22%20id%3D%22canvas_background%22%20height%3D%22120%22%20width%3D%221370%22%20y%3D%22-1%22%20x%3D%22-1%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Ctitle%3ELayer%201%3C%2Ftitle%3E%3Cg%20stroke%3D%22null%22%20id%3D%22svg_99%22%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_1%22%20fill%3D%22%23C4C4C4%22%20height%3D%2227.83207%22%20width%3D%220.98231%22%20y%3D%229.90678%22%20x%3D%221293.51265%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_2%22%20fill%3D%22%23C4C4C4%22%20transform%3D%22matrix(0%2C0.3715847134590149%2C-0.3715847134590149%2C0%2C1387.6147898635318%2C-464.2274208206145)%20%22%20height%3D%22169.795%22%20width%3D%222.44898%22%20y%3D%2285.7345%22%20x%3D%221350.273%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_3%22%20fill%3D%22white%22%20d%3D%22m1307.31851%2C75.81762l-4.61583%2C16.97548l-15.10715%2C0l19.72297%2C-66.12982l19.24214%2C0l20.2038%2C66.12982l-15.87224%2C0l-5.00302%2C-16.97548l-18.57069%2C0zm16.63473%2C-11.18507l-4.22157%2C-14.03178c-1.15005%2C-3.92059%20-2.13884%2C-8.23439%20-3.10087%2C-12.16096l-0.36044%2C-0.59383c-0.96649%2C3.92661%20-1.9263%2C8.92821%20-2.9868%2C12.75479l-3.84627%2C14.03178l14.51596%2C0z%22%2F%3E%0A%20%20%20%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_4%22%20fill%3D%22white%22%20d%3D%22m1259.22218%2C92.8087l-20.78336%2C-66.12963l16.06703%2C0l7.88919%2C27.96194c2.21502%2C7.94931%204.25762%2C14.52971%205.79486%2C22.77331l0.2642%2C0.87397c1.6398%2C-7.9534%203.66011%2C-15.80015%205.8729%2C-23.35484l8.27408%2C-28.25437l15.58612%2C0l-21.83952%2C66.12963l-17.12548%2C0z%22%2F%3E%3Cpath%20stroke%3D%22%23C4C4C4%22%20id%3D%22svg_5%22%20stroke-miterlimit%3D%2210%22%20stroke-width%3D%223%22%20d%3D%22m1262.33038%2C55.41019l-35.79325%2C-0.30358%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_6%22%20fill%3D%22%23C4C4C4%22%20height%3D%2245.19659%22%20width%3D%220.91%22%20y%3D%229.91%22%20x%3D%221262.02717%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_7%22%20fill%3D%22%23C4C4C4%22%20transform%3D%22matrix(0%2C-0.3715847134590149%2C0.3715847134590149%2C0%2C1256.8629195066871%2C418.8308143413331)%20%22%20height%3D%2287.3467%22%20width%3D%222.44897%22%20y%3D%2213.89795%22%20x%3D%221098.029%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_8%22%20fill%3D%22%23C4C4C4%22%20transform%3D%22matrix(-0.3715847134590149%2C0%2C0%2C-0.3715847134590149%2C1824.7376210804941%2C204.0507672560635)%20%22%20height%3D%22181.224%22%20width%3D%222.44899%22%20y%3D%22266.958%22%20x%3D%221306.191%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_9%22%20fill%3D%22%23C4C4C4%22%20d%3D%22m1304.04076%2C87.86663l0.24748%2C-0.91001l35.08912%2C0l0%2C0.91001l-35.33659%2C0z%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_10%22%20fill%3D%22%23C4C4C4%22%20d%3D%22m1243.22048%2C88.17021l0%2C-0.91001l46.03567%2C0l-0.2824%2C0.91001l-45.75326%2C0z%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_11%22%20fill%3D%22%2302BFE7%22%20d%3D%22m1263.57259%2C54.02529l-2.30085%2C0l0%2C2.29602l2.30085%2C0l0%2C-2.29602z%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_12%22%20fill%3D%22%2302BFE7%22%20d%3D%22m1278.88782%2C9l-2.30085%2C0l0%2C2.29624l2.30085%2C0l0%2C-2.29624z%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_13%22%20fill%3D%22%2302BFE7%22%20d%3D%22m1311.64785%2C36.90668l-2.30048%2C0l0%2C2.29624l2.30048%2C0l0%2C-2.29624z%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_14%22%20fill%3D%22%2302BFE7%22%20d%3D%22m1340.16103%2C47.5233l-2.30048%2C0l0%2C2.29639l2.30048%2C0l0%2C-2.29639z%22%2F%3E%3Cpath%20stroke%3D%22null%22%20id%3D%22svg_15%22%20fill%3D%22%2302BFE7%22%20d%3D%22m1314.07466%2C86.0466l-2.30085%2C0l0%2C2.29639l2.30085%2C0l0%2C-2.29639z%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_16%22%20fill%3D%22%23E31C3D%22%20height%3D%226.31694%22%20width%3D%226.68852%22%20y%3D%2284.4317%22%20x%3D%221241.95082%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_17%22%20fill%3D%22%23FDB81E%22%20height%3D%226.31694%22%20width%3D%226.68852%22%20y%3D%2234.63935%22%20x%3D%221352.31148%22%2F%3E%3Crect%20stroke%3D%22null%22%20id%3D%22svg_18%22%20fill%3D%22%232E8540%22%20height%3D%226.68852%22%20width%3D%226.68852%22%20y%3D%22101.52459%22%20x%3D%221335.59016%22%2F%3E%3Crect%20stroke%3D%22null%22%20x%3D%221222.99999%22%20id%3D%22svg_19%22%20fill%3D%22%2302BFE7%22%20height%3D%226.68852%22%20width%3D%226.68852%22%20y%3D%2251.73224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
  ),
  default: genPageTheme(
    ['#112e51', '#112e51'],
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='1368' height='400' fill='none'%3e%3cmask id='a' width='2269' height='1408' x='-610' y='-509' maskUnits='userSpaceOnUse'%3e%3ccircle cx='1212.8' cy='74.8' r='317.5' fill='url(%23paint0_linear)' transform='rotate(-52 1213 75)'/%3e%3ccircle cx='737.8' cy='445.8' r='317.5' fill='url(%23paint1_linear)' transform='rotate(-116 738 446)'/%3e%3ccircle cx='601.8' cy='52.8' r='418.6' fill='url(%23paint2_linear)' transform='rotate(-117 602 53)'/%3e%3ccircle cx='999.8' cy='364' r='389.1' fill='url(%23paint3_linear)' transform='rotate(31 1000 364)'/%3e%3cellipse cx='-109.2' cy='263.5' fill='url(%23paint4_linear)' rx='429.2' ry='465.8' transform='rotate(-85 -109 264)'/%3e%3c/mask%3e%3cg mask='url(%23a)'%3e%3cpath fill='white' d='M0 0h1368v400H0z'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient id='paint0_linear' x1='1301.2' x2='161.4' y1='-1879.7' y2='-969.6' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='white'/%3e%3cstop offset='1' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear' x1='826.2' x2='-313.6' y1='-1508.7' y2='-598.6' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='white'/%3e%3cstop offset='1' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient id='paint2_linear' x1='718.4' x2='-784.3' y1='-2524' y2='-1324.2' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='white'/%3e%3cstop offset='1' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient id='paint3_linear' x1='1108.2' x2='-288.6' y1='-2031.1' y2='-915.9' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='white'/%3e%3cstop offset='1' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient id='paint4_linear' x1='10.4' x2='-1626.5' y1='-2603.8' y2='-1399.5' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='white'/%3e%3cstop offset='1' stop-color='white' stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
  ),
};

/**
 * BASE THEME
 */
const baseTheme: BackstageTheme = {
  ...muiTheme, // Theme
  palette, // BackstagePalette
  page: pageBanners.default,
  getPageTheme: ({ themeId }: PageThemeSelector) => {
    return (pageBanners[themeId] as PageTheme) || pageBanners.default;
  },
};

/**
 * LIGHT THEME
 */
const lightTheme: BackstageTheme = {
  ...baseTheme,
  overrides: createThemeOverrides(baseTheme),
};

const theme: AppTheme = {
  id: 'light',
  title: 'Lighthouse Light Theme',
  variant: 'light',
  theme: lightTheme,
  icon: <LightIcon />,
};

export default theme;
