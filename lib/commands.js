module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent.trim());
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },

  clickFilmSeanceByTitle: async function (page, filmTitle) {
    await page.waitForSelector(".movie");

    const success = await page.evaluate((title) => {
      const normalize = (str) =>
        str
          .replace(/["«»]/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();

      const expectedTitle = normalize(title);
      const movies = [...document.querySelectorAll(".movie")];

      const targetMovie = movies.find((movie) => {
        const movieTitle = movie.querySelector(".movie__title");
        if (!movieTitle) return false;

        const actualTitle = normalize(movieTitle.textContent);
        return actualTitle.includes(expectedTitle);
      });

      if (!targetMovie) return false;

      const seance = targetMovie.querySelector(".movie-seances__time");
      if (!seance) return false;

      seance.click();
      return true;
    }, filmTitle);

    if (!success) {
      throw new Error(`Не найден фильм или сеанс для фильма: ${filmTitle}`);
    }
  },
};