import { Page } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  nameInput = this.page.locator('#signupName');
  lastNameInput = this.page.locator('#signupLastName');
  emailInput = this.page.locator('#signupEmail');
  passwordInput = this.page.locator('#signupPassword');
  repeatPasswordInput = this.page.locator('#signupRepeatPassword');
  
  registerButton = this.page.getByRole('button', { name: 'Register' });

  nameError = this.page.locator('.invalid-feedback').first();
  errorMessage = (text: string) => this.page.getByText(text);

  async open() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }

  async register(name: string, lastName: string, email: string, password: string) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
    await this.registerButton.click();
  }

}