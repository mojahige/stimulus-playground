import { test, expect } from '../../settings/test/fixture';

test('Click the button to slide.', async ({ page, storybookURL }) => {
  await page.goto(storybookURL);

  await page.click('#storybook-explorer-tree :text("Slider")');

  const previewIframe = await page.frame({
    name: 'storybook-preview-iframe',
  });

  if (previewIframe == null) {
    throw new Error(`storybook-preview-iframe is not found.`);
  }

  const beforeScrollLeft = await previewIframe.$eval(
    '[data-slider-target="viewport"]',
    (el) => el.scrollLeft
  );

  await previewIframe.click('[data-slider-target="next"]');
  await previewIframe.waitForTimeout(1000);

  let afterScrollLeft = await previewIframe.$eval(
    '[data-slider-target="viewport"]',
    (el) => el.scrollLeft
  );

  // For the next button slide, scrollLeft will be larger than the initial position.
  expect(afterScrollLeft > beforeScrollLeft).toBe(true);

  await previewIframe.click('[data-slider-target="prev"]');
  await previewIframe.waitForTimeout(1000);

  afterScrollLeft = await previewIframe.$eval(
    '[data-slider-target="viewport"]',
    (el) => el.scrollLeft
  );

  // For the prev button slide, scrollLeft will be the same as the initial position.
  expect(afterScrollLeft === beforeScrollLeft).toBe(true);
});
