import { expect, Locator, Page } from '@playwright/test';
import { ProductsPage } from './productsPage';

export class CheckoutPage {
  private productRows: Locator;
  private totalAmount: Locator;
  private placeOrderButton: Locator;

  constructor(private page: Page, private productsPage: ProductsPage) {
    this.productRows = page.locator('tr.cart_product');
    this.totalAmount = page.locator('p.cart_total_price');
    this.placeOrderButton = page.locator('a[href="/payment"]');
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  async verifyOrderSummary() {
    const expected = this.productsPage.getSelectedProducts();
    const rowCount = await this.productRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = this.productRows.nth(i);
      const name = (await row.locator('td.cart_description > h4 > a').textContent())?.trim();
      const price = (await row.locator('td.cart_price > p').textContent())?.trim();
      const quantity = (await row.locator('td.cart_quantity input').getAttribute('value'))?.trim();
      const total = (await row.locator('td.cart_total > p').textContent())?.trim();

      const expectedProduct = expected[i];
      const expectedTotal = `Rs. ${parseInt(expectedProduct.price.replace(/\D/g, '')) * parseInt(quantity || '1')}`;

      expect(name).toBe(expectedProduct.name);
      expect(price).toBe(expectedProduct.price);
      expect(total).toBe(expectedTotal);
    }

    await this.totalAmount.last().waitFor({ state: 'visible' });
    const totalText = await this.totalAmount.last().textContent();

    const expectedSum = expected.reduce((acc, p) => acc + parseInt(p.price.replace(/\D/g, '')), 0);
    expect(totalText).toContain(expectedSum.toString());
  }
}
