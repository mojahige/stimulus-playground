import { test as base } from '@playwright/test';

const serverURL = 'http://localhost:6006';

type WorkerFixture = {
  storybookURL: string;
};

export const test = base.extend<{ [key: string]: unknown }, WorkerFixture>({
  storybookURL: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, _workerInfo) => {
      await use(serverURL);
    },
    { scope: 'worker' },
  ],
});

export const expect = test.expect;
