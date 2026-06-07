import { test, expect } from '@playwright/test';

test('should display mocked profile data', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('#signinEmail').fill(process.env.USER_EMAIL || '');
  await page.locator('#signinPassword').fill(process.env.USER_PASSWORD || '');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*\/panel\/garage/);

  await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 365008,
          photoFilename: 'default-user.png',
          name: 'Mocked',
          lastName: 'User',
        },
      }),
    });
  });

  await page.goto('/panel/profile');

  await expect(page.getByText('Mocked User')).toBeVisible();
});