/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled } from '../styles/index.js';
import { getSvgStyles } from '../icon/styled-components.js';
import { SIZE } from './constants.js';
import type { StyledSpinnerNextPropsT } from './types.js';

type StylePropsT = {
  $size?: number | string,
  $color?: string,
};

const spin = {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
};

/**
 * Spinner icon overrides
 */
export const Svg = styled<StylePropsT>('svg', (props) => {
  const { $theme, $color } = props;
  return {
    ...getSvgStyles(props),
    fill: $color || $theme.colors.accent,
    cursor: 'wait',
    animationName: spin,
    animationDuration: $theme.animation.timing1000,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  };
});

export const StyledTrackPath = styled<StylePropsT>('path', (props) => ({
  fill: props.$theme.colors.spinnerTrackFill,
  opacity: 0.16,
}));

export const StyledActivePath = styled<StylePropsT>('path', (props) => ({
  fill: props.$color || props.$theme.colors.accent,
}));

// TODO(v11): Replace Spinner with SpinnerNext
export const StyledSpinnerNext = styled<StyledSpinnerNextPropsT>(
  'i',
  ({
    //$FlowFixMe
    $theme,
    $color = $theme.colors.contentAccent,
    //$FlowFixMe
    $borderWidth,
    //$FlowFixMe
    $size = SIZE.medium,
  }) => {
    let borderSize = {
      large: $theme.sizing.scale300,
      medium: $theme.sizing.scale100,
      small: $theme.sizing.scale0,
    }[$borderWidth || $size];
    let boxSize = {
      large: $theme.sizing.scale1000,
      medium: $theme.sizing.scale900,
      small: $theme.sizing.scale800,
    }[$size];

    if (!borderSize) {
      borderSize = $theme.sizing[$borderWidth];
      if (!borderSize) {
        borderSize = `${parseInt($borderWidth)}px`;
      }
    }
    if (!boxSize) {
      boxSize = $theme.sizing[$size];
      if (!boxSize) {
        boxSize = `${parseInt($size)}px`;
      }
    }

    return {
      display: 'block',
      animationName: spin,
      animationDuration: $theme.animation.timing1000,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderRadius: '50%',
      borderTopColor: $color,
      borderRightColor: $theme.colors.backgroundTertiary,
      borderBottomColor: $theme.colors.backgroundTertiary,
      borderLeftColor: $theme.colors.backgroundTertiary,
      borderLeftWidth: borderSize,
      borderRightWidth: borderSize,
      borderTopWidth: borderSize,
      borderBottomWidth: borderSize,
      width: boxSize,
      height: boxSize,
      cursor: 'wait',
    };
  }
);
