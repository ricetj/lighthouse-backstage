/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 30,
  },
  path: {
    fill: '#7df3e1',
  },
});
const LogoFull = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      viewBox="0 0 2079.95 456.05"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <title>background</title>
        <rect
          fill="none"
          id="canvas_background"
          height="458"
          width="2081"
          y="-1"
          x="-1"
        />
        <g
          display="none"
          overflow="visible"
          y="0"
          x="0"
          height="100%"
          width="100%"
          id="canvasGrid"
        >
          <rect
            fill="url(#gridpattern)"
            strokeWidth="0"
            y="0"
            x="0"
            height="100%"
            width="100%"
          />
        </g>
      </g>
      <g>
        <title>Layer 1</title>
        <text
          fontStyle="normal"
          fontWeight="bold"
          stroke="#000"
          transform="matrix(6.238465938249441,0,0,6.238465938249441,-500.46670538753636,-282.51545055080544) "
          textAnchor="start"
          fontFamily="sans-serif"
          fontSize="40"
          id="svg_2"
          y="93"
          x="81.10266"
          strokeWidth="0"
          fill="#ffffff"
        >
          VA
        </text>
        <text
          stroke="#000"
          transform="matrix(7.662758558914332,0,0,7.880736159159941,-3246.4819543918397,-1200.9887984558466) "
          textAnchor="start"
          fontFamily="sans-serif"
          fontSize="40"
          id="svg_3"
          y="194.92427"
          x="489.18669"
          strokeWidth="0"
          fill="#ffffff"
        >
          Lighthouse
        </text>
        <line
          strokeWidth="15"
          stroke="#ffffff"
          id="svg_4"
          y2="370.67858"
          x2="416.83247"
          y1="67.99977"
          x1="416.83247"
          fillOpacity="null"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default LogoFull;
