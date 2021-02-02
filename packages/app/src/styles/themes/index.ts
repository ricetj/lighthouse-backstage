import React from 'react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import LightIcon from '@material-ui/icons/WbSunny';
import { AppTheme } from '@backstage/core';

const themes:AppTheme[] = [
    {
      id: 'light',
      title: 'Lighthouse Light Theme',
      variant: 'light',
      theme: lightTheme,
      icon: <LightIcon />
    },
  ]

export default themes;
