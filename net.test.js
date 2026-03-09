const {
  clickElement,
  getText,
  clickFilmSeanceByTitle,
} = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(async () => {
  await page.close();
});

describe("Test suite of three test cases for booking tickets", () => {
  test("Booking one ticket", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickFilmSeanceByTitle(page, "Сталкер(1979)");
    await page.waitForSelector(".buying-scheme__chair");

    await clickElement(page, ".buying-scheme__chair.buying-scheme__chair_standart");
    await clickElement(page, ".acceptin-button");

    const movieTitle = await getText(page, ".ticket__title");
    expect(movieTitle).toContain("Сталкер(1979)");
  });

  test("Booking multiple tickets", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickFilmSeanceByTitle(page, "Ведьмак");
    await page.waitForSelector(".buying-scheme__chair");

    const freeSeats = await page.$$(".buying-scheme__chair.buying-scheme__chair_standart");

    await freeSeats[0].click();
    await freeSeats[1].click();
    await freeSeats[2].click();

    await clickElement(page, ".acceptin-button");

    const movieTitle = await getText(page, ".ticket__title");
    expect(movieTitle).toContain("Ведьмак");
  });

  test("Reservation of occupied seats", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickFilmSeanceByTitle(page, "Сталкер(1979)");
    await page.waitForSelector(".buying-scheme__chair");

    await clickElement(page, ".buying-scheme__chair.buying-scheme__chair_taken");

    const isDisabled = await page.$eval(".acceptin-button", (btn) => btn.disabled);
    expect(isDisabled).toBe(true);
  });
});