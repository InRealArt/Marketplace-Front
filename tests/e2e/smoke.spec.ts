import { test, expect } from '@playwright/test'

test.describe('Artworks page smoke test', () => {
  test('loads artworks listing', async ({ page }) => {
    await page.goto('/artworks')

    await expect(page.getByRole('heading', { name: /discover available artworks/i })).toBeVisible()
    await expect(page.getByText(/\d+\s+artwork\(s\)/i)).toBeVisible()
  })
})


