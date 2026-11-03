# Sauce Demo – Playwright Test Automation Framework

![Playwright Tests](https://github.com/YOUR-USERNAME/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation for [saucedemo.com](https://www.saucedemo.com), built with **Playwright** and **JavaScript** using the **Page Object Model**, running in **GitHub Actions** across Chromium, Firefox, and WebKit.

📊 **Latest test report:** https://YOUR-USERNAME.github.io/saucedemo-playwright/

## What is tested
| Area | Coverage |
|---|---|
| Login | Valid login, locked-out user, wrong password, empty fields (data-driven) |
| Inventory | Product count, sort by price and name, cart badge updates |
| Checkout | Full order flow, subtotal calculation, required-field validation (data-driven) |

## Tech stack
Playwright · JavaScript (Node.js) · Page Object Model · GitHub Actions · GitHub Pages

## Project structure
```
pages/          Page objects (selectors and actions for each screen)
tests/          Test specs grouped by feature
test-data/      Test users and checkout data
.github/        CI workflow: runs tests and publishes the HTML report
TEST_PLAN.md    Scope, approach, risks, and exit criteria
```

## Run locally
```bash
npm install
npx playwright install
npm test                # all browsers
npm run test:headed     # watch tests run in Chromium
npx playwright test --grep @smoke   # smoke suite only
npm run report          # open the HTML report
```

## Design decisions
- **Page Object Model** keeps selectors in one place, so a UI change means one edit, not many.
- **`data-test` selectors** are more stable than CSS classes or text.
- **Data-driven tests** generate one test per input row for negative cases.
- **Failure evidence:** trace, screenshot, and video are saved automatically when a test fails.
- **One retry in CI** separates flaky failures from real ones.
