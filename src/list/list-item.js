/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import { getOverrides } from '../helpers/overrides.js';

import { ARTWORK_SIZES, SHAPE } from './constants.js';
import {
  StyledRoot,
  StyledContent,
  StyledEndEnhancerContainer,
  StyledArtworkContainer,
} from './styled-components.js';
import type { PropsT } from './types.js';
import { artworkSizeToValue } from './utils.js';

const ListItem = React.forwardRef<PropsT, HTMLLIElement>((props: PropsT, ref) => {
  const { overrides = {} } = props;
  const Artwork = props.artwork;
  const EndEnhancer = props.endEnhancer;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [ArtworkContainer, artworkContainerProps] = getOverrides(
    overrides.ArtworkContainer,
    StyledArtworkContainer
  );
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [EndEnhancerContainer, endEnhancerContainerProps] = getOverrides(
    overrides.EndEnhancerContainer,
    StyledEndEnhancerContainer
  );

  const artworkSize = React.useMemo(() => {
    if (props.sublist) {
      let size = props.artworkSize || ARTWORK_SIZES.SMALL;
      if (props.artworkSize === ARTWORK_SIZES.MEDIUM) {
        size = ARTWORK_SIZES.SMALL;
        if (__DEV__) {
          console.warn(
            'When ListItem sublist prop is true, artworkSize MEDIUM is aliased to SMALL'
          );
        }
      }
      return size;
    } else {
      return props.artworkSize || ARTWORK_SIZES.MEDIUM;
    }
  }, [props.artworkSize, props.sublist]);

  return (
    <Root
      // flowlint-next-line unclear-type:off
      ref={(ref: any)}
      $shape={props.shape || SHAPE.DEFAULT}
      {...rootProps}
    >
      {Artwork && (
        <ArtworkContainer
          $artworkSize={artworkSize}
          $sublist={Boolean(props.sublist)}
          {...artworkContainerProps}
        >
          <Artwork
            size={
              typeof artworkSize === 'number'
                ? artworkSize
                : artworkSizeToValue(artworkSize, Boolean(props.sublist))
            }
          />
        </ArtworkContainer>
      )}
      <Content $mLeft={!Artwork} $sublist={!!props.sublist} {...contentProps}>
        {props.children}
        {EndEnhancer && EndEnhancer !== 0 && (
          <EndEnhancerContainer {...endEnhancerContainerProps}>
            <EndEnhancer />
          </EndEnhancerContainer>
        )}
      </Content>
    </Root>
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
