import { test as setup, expect } from '@playwright/test';

setup('login and save storage state', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.locator('#signinEmail').fill(process.env.USER_EMAIL || '');
  await page.locator('#signinPassword').fill(process.env.USER_PASSWORD || '');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*\/panel\/garage/);

  await page.context().storageState({ path: '.auth/user.json' });
});