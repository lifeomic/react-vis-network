import initStoryshots from '@storybook/addon-storyshots';
import { mount } from 'enzyme';

// For coverage and error checking
initStoryshots({
  suite: 'Storyshots coverage',
  test: ({ story, context, renderTree }) => {
    const result = renderTree(story, context, {
      renderer: mount
    });

    if (typeof result.then === 'function') {
      return result;
    }

    return undefined;
  }
});
