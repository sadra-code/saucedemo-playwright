const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, PASSWORD } = require('../test-data/users');

async function loginAs(page, username) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(username, PASSWORD);
  const inventory = new InventoryPage(page);
  await inventory.expectLoaded();
  return inventory;
}

test.describe('Product images', () => {
  test('standard user sees a different image for each product', async ({ page }) => {
    const inventory = await loginAs(page, users.standard);
    const sources = await inventory.getImageSources();
    expect(sources).toHaveLength(6);
    expect(new Set(sources).size).toBe(6); // 6 unique images
  });

  test('problem user sees a different image for each product', async ({ page }) => {
    const inventory = await loginAs(page, users.problem);
    const sources = await inventory.getImageSources();
    expect(new Set(sources).size).toBe(6);
  });
});
