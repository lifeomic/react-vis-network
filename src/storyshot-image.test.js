import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
  suite: `Image Storyshots`,
  test: imageSnapshot({
    // Uncomment for local dev without rebuilding
    // storybookUrl: 'http://localhost:9001',
    storybookUrl: `file://${path.resolve(__dirname, '../storybook-static')}`,
    getMatchOptions: () => ({
      failureThreshold: 0.15,
      failureThresholdType: 'percent'
    })
  })
});
