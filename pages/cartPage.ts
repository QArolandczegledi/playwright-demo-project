import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  private cartRows: Locator;
  private proceedToCheckoutBtn: Locator;

  constructor(private page: Page) {
    this.cartRows = page.locator('tr[id^="product-"]');
    this.proceedToCheckoutBtn = page.locator('.check_out');
  }

  async validateCartContents(expectedProducts: {
    name: string;
    price: string;
    quantity: number;
    totalPrice: string;
  }[]) {
    const count = await this.cartRows.count();
    expect(count).toBe(expectedProducts.length);

    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);
      const name = await row.locator('h4 a').textContent();
      const price = await row.locator('.cart_price p').textContent();
      const quantity = await row.locator('.cart_quantity button').textContent();
      const total = await row.locator('.cart_total p').textContent();

      const expected = expectedProducts[i];

      expect(name?.trim()).toBe(expected.name);
      expect(price?.trim()).toBe(expected.price);
      expect(quantity?.trim()).toBe(expected.quantity.toString());
      expect(total?.trim()).toBe(expected.totalPrice);
    }
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}
