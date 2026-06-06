import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { generateEmail, validUser } from '../utils/data';

test.describe('Registration form validation', () => {
  test('should register a new user with valid data', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const uniqueEmail = generateEmail();

    await registrationPage.open();

    await registrationPage.register(
      validUser.name,
      validUser.lastName,
      uniqueEmail,
      validUser.password
    );

    await expect(page).toHaveURL(/.*\/panel\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  });

  test('should show validation error for empty name field', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const uniqueEmail = generateEmail();

  await registrationPage.open();

  await registrationPage.lastNameInput.fill(validUser.lastName);
  await registrationPage.emailInput.fill(uniqueEmail);
  await registrationPage.passwordInput.fill(validUser.password);
  await registrationPage.repeatPasswordInput.fill(validUser.password);

  await registrationPage.nameInput.click();
  await registrationPage.lastNameInput.click();

  await expect(registrationPage.nameError).toHaveText('Name required');
  await expect(registrationPage.registerButton).toBeDisabled();
 
});  

  test('should show validation error for empty last name field', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const uniqueEmail = generateEmail();

  await registrationPage.open();

  await registrationPage.nameInput.fill(validUser.name);
  await registrationPage.emailInput.fill(uniqueEmail);
  await registrationPage.passwordInput.fill(validUser.password);
  await registrationPage.repeatPasswordInput.fill(validUser.password);

  await registrationPage.lastNameInput.click();
  await registrationPage.emailInput.click();

  await expect(registrationPage.errorMessage('Last name required')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show validation error for invalid email', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.open();

  await registrationPage.emailInput.fill('wrongemail');
  await registrationPage.passwordInput.click();

  await expect(registrationPage.errorMessage('Email is incorrect')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show validation error when passwords do not match', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.open();

  await registrationPage.passwordInput.fill(validUser.password);
  await registrationPage.repeatPasswordInput.fill('Different123');
  await registrationPage.passwordInput.click();

  await expect(registrationPage.errorMessage('Passwords do not match')).toBeVisible();
  await expect(registrationPage.registerButton).toBeDisabled();
});

  test('should show validation error for incorrect email format', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.open();

  await registrationPage.nameInput.fill(validUser.name);
  await registrationPage.lastNameInput.fill(validUser.lastName);
  await registrationPage.emailInput.fill('invalid-email');
  await registrationPage.passwordInput.fill(validUser.password);
  await registrationPage.repeatPasswordInput.fill(validUser.password);

  await registrationPage.passwordInput.click();

  await expect(
    registrationPage.errorMessage('Email is incorrect')
  ).toBeVisible();

  await expect(registrationPage.registerButton).toBeDisabled();

});

});