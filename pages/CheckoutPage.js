const { expect } = require('@playwright/test');

class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.error = page.getByTestId('error');
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillInfo({ firstName = '', lastName = '', postalCode = '' }) {
    if (firstName) await this.firstName.fill(firstName);
    if (lastName) await this.lastName.fill(lastName);
    if (postalCode) await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  /** Checks that the subtotal shown equals the sum of the item prices. */
  async expectSubtotalMatchesItems() {
    const prices = (await this.itemPrices.allTextContents()).map((t) => parseFloat(t.replace('$', '')));
    const expected = prices.reduce((a, b) => a + b, 0).toFixed(2);
    await expect(this.subtotal).toContainText(`$${expected}`);
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutPage };
