const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, PASSWORD } = require('../test-data/users');

test.describe('Login', () => {
  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('standard user can log in @smoke', async ({ page }) => {
    await login.login(users.standard, PASSWORD);
    await new InventoryPage(page).expectLoaded();
  });

  // Data-driven negative tests: one test is generated per row.
  const negativeCases = [
    { name: 'locked-out user', user: users.lockedOut, pass: PASSWORD, error: 'Sorry, this user has been locked out' },
    { name: 'wrong password', user: users.standard, pass: 'wrong_pass', error: 'Username and password do not match' },
    { name: 'empty username', user: '', pass: PASSWORD, error: 'Username is required' },
    { name: 'empty password', user: users.standard, pass: '', error: 'Password is required' },
  ];

  for (const c of negativeCases) {
    test(`shows an error for ${c.name}`, async () => {
      await login.login(c.user, c.pass);
      await login.expectError(c.error);
    });
  }
});
