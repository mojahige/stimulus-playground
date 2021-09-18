import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    launchOptions: {
      slowMo: 2000,
    },
  },
};
export default config;
