import { Page, expect, Locator } from '@playwright/test';
import { promises as fs } from 'fs';

export class OrderConfirmationPage {
  private readonly confirmationMessage: Locator;
  private readonly downloadInvoiceBtn: Locator;
  private readonly continueBtn: Locator;

  constructor(private readonly page: Page) {
    this.confirmationMessage = page.locator('[data-qa="order-placed"]');
    this.downloadInvoiceBtn = page.locator('a[href*="/download"]');
    this.continueBtn = page.locator('a[href="/"]');
  }

  async expectConfirmationVisible(): Promise<void> {
    await expect(this.confirmationMessage).toContainText('Order Placed!');
  }

  async downloadInvoice(): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceBtn.click()
    ]);

    const filePath = await download.path();
    return filePath;
  }

  async validateInvoiceContent(
    filePath: string,
    expectedName: string,
    expectedAmount: string
  ): Promise<void> {
    const content = await fs.readFile(filePath, 'utf-8');

    expect.soft(content).toContain(expectedName);
    expect.soft(content).toContain(expectedAmount);
  }

  async continueShopping(): Promise<void> {
    await this.continueBtn.click();
  }
}
