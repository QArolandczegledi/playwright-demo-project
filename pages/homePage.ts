import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('https://www.automationexercise.com/');
  }

  async clickSignupLogin() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  async productsLink() {
    await  this.page.getByRole('link', { name: ' Products' }).click();
  }

  
}
