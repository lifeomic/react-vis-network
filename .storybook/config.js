import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.story.js');
}

configure(loadStories, module);
