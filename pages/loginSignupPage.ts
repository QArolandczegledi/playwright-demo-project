import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class LoginSignupPage {
  private readonly firstName = faker.person.firstName();
  private readonly lastName = faker.person.lastName();
  private readonly testEmail = faker.internet.email();

  constructor(private readonly page: Page) {}

  async fillSignupForm(): Promise<void> {
    await this.page.locator('[data-qa="signup-name"]').fill(this.fullName);
    await this.page.locator('[data-qa="signup-email"]').fill(this.testEmail);
    await this.page.locator('[data-qa="signup-button"]').click();
  }

  async fillLogin(email: string, password: string): Promise<void> {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async assertLogoutVisible(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible();
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get email(): string {
    return this.testEmail;
  }

  get firstNameValue(): string {
    return this.firstName;
  }

  get lastNameValue(): string {
    return this.lastName;
  }
}
