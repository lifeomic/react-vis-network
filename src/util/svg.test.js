import React from 'react';
import { reactToSvgImageUrl } from './svg';

describe('reactToSvgImageUrl', () => {
  it('converts react elements into data:image strings', () => {
    const string = reactToSvgImageUrl(
      <svg viewBox="0 0 48 48">
        <circle cx="18" cy="18" r="12" />
      </svg>
    );

    expect(string).toMatchSnapshot();
  });
});
