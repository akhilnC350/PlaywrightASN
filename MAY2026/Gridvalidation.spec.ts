import { test, expect } from '@playwright/test';

test('Validate First Row Data', async ({ page }) => {

  await page.goto('https://qaplayground.com/practice/data-table');

  // Scroll table into view
  await page.locator('#books-table')
    .scrollIntoViewIfNeeded();

  // Validate first row visibility
  await expect(page.locator('#row-1'))
    .toBeVisible();

  // Validate Sr No
  await expect(page.getByTestId('cell-sr-1'))
    .toHaveText('1');

  // -------------------------------
  // Book Name Validation
  // -------------------------------

  const bookTitle = await page
    .getByTestId('cell-title-1')
    .textContent();

  expect(bookTitle).not.toBeNull();

  expect(bookTitle?.trim()).not.toBe('');

  expect(bookTitle).toMatch(/[A-Za-z]/);

  // -------------------------------
  // Genre Validation
  // -------------------------------

  const genre = await page
    .getByTestId('cell-genre-1')
    .textContent();

  expect(genre).not.toBeNull();

  expect(genre?.trim()).not.toBe('');

  expect(genre).toMatch(/[A-Za-z]/);

  // -------------------------------
  // Author Validation
  // -------------------------------

  const author = await page
    .getByTestId('cell-author-1')
    .textContent();

  expect(author).not.toBeNull();

  expect(author?.trim()).not.toBe('');

  expect(author).toMatch(/[A-Za-z]/);

  // -------------------------------
  // ISBN Validation
  // -------------------------------

  const isbn = await page
    .getByTestId('cell-isbn-1')
    .textContent();

  expect(isbn).toMatch(/^\d+$/);

  // -------------------------------
  // Published Date Validation
  // -------------------------------

  const publishedDate = await page
    .getByTestId('cell-published-1')
    .textContent();

  expect(publishedDate)
    .toMatch(/^\d{4}-\d{2}-\d{2}$/);

});