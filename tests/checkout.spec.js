const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users, PASSWORD, checkoutInfo } = require('../test-data/users');

test.describe('Checkout', () => {
  let inventory, cart, checkout;
  const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard, PASSWORD);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    for (const p of products) await inventory.addToCart(p);
    await inventory.openCart();
  });

  test('completes an order end to end @smoke', async () => {
    await cart.expectItems(products);
    await cart.checkout();
    await checkout.fillInfo(checkoutInfo);
    await checkout.expectSubtotalMatchesItems();
    await checkout.finish();
    await checkout.expectOrderComplete();
  });

  const missingFieldCases = [
    { field: 'first name', info: { lastName: 'Doe', postalCode: '98101' }, error: 'First Name is required' },
    { field: 'last name', info: { firstName: 'Jane', postalCode: '98101' }, error: 'Last Name is required' },
    { field: 'postal code', info: { firstName: 'Jane', lastName: 'Doe' }, error: 'Postal Code is required' },
  ];

  for (const c of missingFieldCases) {
    test(`blocks checkout when ${c.field} is missing`, async ({ page }) => {
      await cart.checkout();
      await checkout.fillInfo(c.info);
      await new LoginPage(page).expectError(c.error);
    });
  }
});
