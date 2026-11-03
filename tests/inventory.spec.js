const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, PASSWORD } = require('../test-data/users');

test.describe('Inventory', () => {
  let inventory;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard, PASSWORD);
    inventory = new InventoryPage(page);
    await inventory.expectLoaded();
  });

  test('shows six products', async () => {
    await expect(inventory.items).toHaveCount(6);
  });

  test('sorts prices low to high', async () => {
    await inventory.sortBy('lohi');
    const prices = await inventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts prices high to low', async () => {
    await inventory.sortBy('hilo');
    const prices = await inventory.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts names Z to A', async () => {
    await inventory.sortBy('za');
    const names = await inventory.names.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('cart badge updates when adding and removing items @smoke', async () => {
    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toHaveText('2');
    await inventory.removeFromCart('Sauce Labs Backpack');
    await expect(inventory.cartBadge).toHaveText('1');
  });
});
