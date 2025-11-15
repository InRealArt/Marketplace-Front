# Playwright End-to-End Tests

## Prerequisites

- Install dependencies: `npm install`
- Ensure Playwright browsers are installed (already handled via `npx playwright install`)
- Environment variables: the tests rely on the same `.env` used for local development. If you need a dedicated test config, create `.env.test` and set `PLAYWRIGHT_BASE_URL` before running tests.

## How to Run

| Command | Description |
| --- | --- |
| `npm run test:e2e` | Runs the full Playwright suite in headless mode. The command automatically starts the Next.js dev server on port 3100 (if not already running) and executes the tests across Chromium, Firefox, and WebKit. |
| `npm run test:e2e -- --project=chromium` | Run the suite for a single browser. |
| `npm run test:e2e:ui` | Opens the Playwright Test runner UI. Useful while writing/debugging tests. |
| `npm run test:e2e:report` | Opens the HTML report for the last run. |

Notes:

- The dev server is started automatically by Playwright's `webServer` configuration. You do **not** need to run `npm run dev` manually. If you prefer to use an existing server, set `PLAYWRIGHT_SKIP_WEB_SERVER=1` before invoking the tests.
- Test artifacts (videos, traces, screenshots, HTML report) are stored under `test-results/` and `playwright-report/`. They are added to `.gitignore`.

## Folder Structure

- `playwright.config.ts`: shared Playwright configuration.
- `tests/e2e`: end-to-end test suites.
- `tests/fixtures` (optional): place shared fixtures/mocks here as the suite grows.

## Mocking backend data / Supabase calls

Playwright tests run against the real Next.js application, so they will normally hit the same backend APIs the app uses. There are a few strategies to control or mock backend data:

1. **Dedicated test environment**  
   - Point the app to a staging database or Supabase project by providing test credentials via environment variables (`PLAYWRIGHT_BASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, etc.).  
   - This keeps tests realistic but requires a separate backend dataset.

2. **Mock HTTP calls via Playwright route interception**  
   - Use `page.route()` in a test (or fixture) to intercept specific HTTP requests and return mocked responses.  
   - Example:
     ```ts
     test.beforeEach(async ({ page }) => {
       await page.route('**/api/artworks*', async route => {
         await route.fulfill({
           status: 200,
           contentType: 'application/json',
           body: JSON.stringify(mockedArtworks)
         })
       })
     })
     ```
   - This is a good option when you need deterministic front-end behavior without relying on live data.

3. **Use Service Worker mocks (MSW)**  
   - For more complex scenarios, integrate Mock Service Worker (MSW). You can run MSW in your Next.js app (for browser context) or use the node version in Playwright tests.  
   - MSW provides organized mock handlers that can be reused across unit/integration/e2e tests.

4. **Custom API endpoints for test data**  
   - Expose API routes limited to test environments (for inserting test data, resetting state, etc.). Guard them with `process.env.NODE_ENV === 'test'` or a secret token.

### Supabase-specific considerations

- Supabase requests go through HTTP; they can be intercepted like any other `fetch` call using `page.route`.
- If you want to mock Supabase client behavior at a higher abstraction (before network calls), consider injecting a mocked Supabase client via dependency injection or using MSW to intercept requests to `supabase.co`.
- For stateful tests (e.g., add-to-cart with Supabase), a dedicated test Supabase project is recommended to avoid polluting production/staging data.

### Tips

- Use fixtures to create reusable mock setup (e.g., intercepting routes before each test).
- Keep tests independent: reset state via API/mocks between tests to avoid order dependencies.
- For CI, ensure `npm run test:e2e` runs after `npm run build` (or use Playwright’s web server as configured).



