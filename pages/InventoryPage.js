const { expect } = require('@playwright/test');

class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.prices = page.locator('.inventory_item_price');
    this.names = page.locator('.inventory_item_name');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.images = page.locator('.inventory_item img');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  /** Converts a product name like "Sauce Labs Backpack" to its button id. */
  slug(productName) {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  async addToCart(productName) {
    await this.page.getByTestId(`add-to-cart-${this.slug(productName)}`).click();
  }

  async removeFromCart(productName) {
    await this.page.getByTestId(`remove-${this.slug(productName)}`).click();
  }

  async sortBy(option) {
    // option values: 'az', 'za', 'lohi', 'hilo'
    await this.sortDropdown.selectOption(option);
  }

  async getPrices() {
    const texts = await this.prices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

    /** Returns the image file path (src) of every product on the page. */
  async getImageSources() {
    return this.images.evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src')));
  }
  
  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
