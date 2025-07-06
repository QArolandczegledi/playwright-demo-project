import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private productCards: Locator;
  private continueShoppingBtn: Locator;

  private selectedProducts: {
    name: string;
    price: string;
    quantity: number;
    totalPrice: string;
  }[] = [];

  constructor(private readonly page: Page) {
    this.productCards = page.locator('.product-image-wrapper');
    this.continueShoppingBtn = page.locator('[data-dismiss="modal"]');
  }

  getSelectedProducts() {
    return this.selectedProducts;
  }

  async selectRandomProducts(): Promise<void> {
    const count = await this.productCards.count();

    if (count === 0) {
      throw new Error('No products found on the page.');
    }

    const indexes = count === 1 ? [0] : this.getTwoUniqueRandomIndexes(count);

    for (const index of indexes) {
      await this.addProductToCart(index);
    }
  }

  private getTwoUniqueRandomIndexes(max: number): number[] {
    const first = Math.floor(Math.random() * max);
    let second = Math.floor(Math.random() * max);
    while (second === first) {
      second = Math.floor(Math.random() * max);
    }
    return [first, second];
  }

  private async addProductToCart(index: number): Promise<void> {
    const product = this.productCards.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.hover();

    const overlay = product.locator('.product-overlay');
    await overlay.waitFor({ state: 'visible' });

    const productData = await this.extractProductInfo(overlay);
    this.selectedProducts.push(productData);

    const addButton = overlay.locator('.add-to-cart');
    const addButtonHandle = await addButton.elementHandle();

    if (addButtonHandle) {
      await this.page.evaluate((btn) => {
        if (btn instanceof HTMLElement) btn.click();
      }, addButtonHandle);
    } else {
      throw new Error('Cannot find add-to-cart button!');
    }

    await this.page.waitForSelector('[data-dismiss="modal"]', { state: 'visible' });
    await this.continueShoppingBtn.click();
  }

  private async extractProductInfo(overlay: Locator) {
    const name = await overlay.locator('p').textContent();
    const price = await overlay.locator('h2').textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      quantity: 1,
      totalPrice: price?.trim() || '',
    };
  }
}
