const cheerio = require('cheerio');

const extractDeputies = (html) => {
  const $ = cheerio.load(html);

  return $('#deputadoA')
    .children()
    .not('[value=""]')
    .map((index, deputyOption) => {
      const deputyValue = deputyOption.attribs.value;
      const deputyInfo = deputyValue.split('!');

      return {
        id: deputyInfo[1],
        name: deputyInfo[0],
      };
    })
    .get();
};

module.exports = {
  extractDeputies,
};
