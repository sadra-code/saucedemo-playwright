const { expect } = require('@playwright/test');

class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async expectItems(names) {
    await expect(this.itemNames).toHaveText(names);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
