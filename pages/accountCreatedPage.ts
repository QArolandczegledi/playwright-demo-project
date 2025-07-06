import { Page, expect } from '@playwright/test';

export class AccountCreatedPage {
  constructor(private page: Page) {}

  async expectVisible() {
    await expect(this.page.locator('[data-qa="account-created"]')).toBeVisible();
  }
}
