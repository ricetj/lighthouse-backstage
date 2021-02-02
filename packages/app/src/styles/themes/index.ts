import React from 'react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import LightIcon from '@material-ui/icons/WbSunny';
import DarkIcon from '@material-ui/icons/Brightness2';
import { AppTheme } from '@backstage/core';

const themes:AppTheme[] = [
    {
      id: 'light',
      title: 'Lighthouse Light Theme',
      variant: 'light',
      theme: lightTheme,
      icon: <LightIcon />
    },
    {
      id: 'dark', 
      title: 'Lighthouse Dark Theme',
      variant: 'dark',
      theme: darkTheme,
      icon: <DarkIcon />
    },
  ]

export default themes;
