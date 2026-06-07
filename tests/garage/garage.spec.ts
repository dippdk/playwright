import { test, expect } from '../fixtures/userGaragePage';

test('should open garage page for logged in user', async ({ userGaragePage }) => {
  await expect(
    userGaragePage.getByRole('heading', { name: 'Garage' })
  ).toBeVisible();

  await expect(
    userGaragePage.getByRole('button', { name: 'Add car' })
  ).toBeVisible();
});