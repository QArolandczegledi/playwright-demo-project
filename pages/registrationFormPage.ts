import { Page, expect } from '@playwright/test';
import { LoginSignupPage } from './loginSignupPage';

export class RegistrationFormPage {
  constructor(
    private readonly page: Page,
    private readonly loginSignup: LoginSignupPage
  ) {}

  async fillForm(): Promise<void> {
    // Basic user info
    await this.page.locator('#uniform-id_gender2').check();
    await this.page.locator('[data-qa="password"]').fill('testpassword');

    // Date of birth
    await this.page.locator('[data-qa="days"]').selectOption('10');
    await this.page.locator('[data-qa="months"]').selectOption('August');
    await this.page.locator('[data-qa="years"]').selectOption('1999');

    // Reusing first and last name from LoginSignupPage
    await this.page.locator('[data-qa="first_name"]').fill(this.loginSignup.firstNameValue);
    await this.page.locator('[data-qa="last_name"]').fill(this.loginSignup.lastNameValue);

    // Address and contact information
    await this.page.locator('[data-qa="company"]').fill('Los Angeles Lakers');
    await this.page.locator('[data-qa="address"]').fill('S Figueroa St');
    await this.page.locator('[data-qa="country"]').selectOption('United States');
    await this.page.locator('[data-qa="state"]').fill('California');
    await this.page.locator('[data-qa="city"]').fill('Los Angeles');
    await this.page.locator('[data-qa="zipcode"]').fill('1111');
    await this.page.locator('[data-qa="mobile_number"]').fill('(814) 264-3618');
  }

  async clickCreateAccount(): Promise<void> {
    await this.page.locator('[data-qa="create-account"]').click();
  }

  async assertNameAndEmailFilledCorrectly(): Promise<void> {
    await expect(this.page.locator('[data-qa="name"]')).toHaveValue(this.loginSignup.fullName);
    await expect(this.page.locator('[data-qa="email"]')).toHaveValue(this.loginSignup.email);
  }
}
