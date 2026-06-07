import { test as base } from '@playwright/test';

type Fixtures = {
  userGaragePage: import('@playwright/test').Page;
};

export const test = base.extend<Fixtures>({
  userGaragePage: async ({ page }, use) => {
    await page.goto('/panel/garage');
    await use(page);
  },
});

export { expect } from '@playwright/test';