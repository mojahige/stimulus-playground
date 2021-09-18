import { test, expect } from '../../settings/test/fixture';

test('basic test', async ({ page, storybookURL }) => {
  await page.goto(storybookURL);

  await page.click('#storybook-explorer-tree :text("Hello")');

  const previewIframe = await page.frame({
    name: 'storybook-preview-iframe',
  });

  if (previewIframe == null) {
    throw new Error(`storybook-preview-iframe is not found.`);
  }

  await previewIframe.fill('[data-hello-target="name"]', 'Playwright');
  await previewIframe.click('[data-action="click->hello#greet"]');

  const outputTextContent = await previewIframe.textContent(
    '[data-hello-target="output"]'
  );

  expect(outputTextContent).toBe('Hello, Playwright!');
});
