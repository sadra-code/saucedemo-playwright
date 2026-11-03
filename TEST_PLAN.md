# Test Plan: Sauce Demo Web Application

## 1. Objective
Verify the core purchase journey of the Sauce Demo web store (login, product browsing, cart, checkout) with automated end-to-end tests that run on every code change.

## 2. Scope
**In scope**
- Authentication: valid login, locked-out user, invalid credentials, required-field validation
- Inventory: product listing, sorting by name and price, add/remove from cart
- Cart and checkout: cart contents, required checkout fields, price subtotal calculation, order completion

**Out of scope**
- Payment processing (the demo site has none)
- Performance and load testing
- Accessibility audit (candidate for a future phase)

## 3. Approach
- Automated UI tests with Playwright (JavaScript) using the Page Object Model
- Data-driven negative testing for login and checkout validation
- Cross-browser execution: Chromium, Firefox, WebKit
- Tests tagged `@smoke` form a fast critical-path suite

## 4. Environment
- Application: https://www.saucedemo.com (public demo)
- CI: GitHub Actions on every push and pull request to `main`
- Reporting: Playwright HTML report published to GitHub Pages; traces, screenshots and videos kept for failures

## 5. Entry and Exit Criteria
- **Entry:** application reachable; dependencies installed
- **Exit:** all smoke tests pass on all three browsers; any failure has a logged GitHub Issue

## 6. Risks
| Risk | Mitigation |
|---|---|
| Public demo site changes or is unavailable | Stable `data-test` selectors; one CI retry to separate flakiness from real failures |
| Known intentional defects for `problem_user` | Documented as GitHub Issues rather than failing the main suite |

## 7. Defect Reporting
Defects are logged as GitHub Issues with: summary, steps to reproduce, expected vs. actual result, severity, browser, and screenshot.
