const cheerio = require('cheerio');

const extractInformation = (node, child = 1) => node.children[child].data.trim();

const extractText = node => node.text().trim();

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

const extractDeputyAddressAndEmail = (html) => {
  const $ = cheerio.load(html);
  const addressAndEmail = $('ul.visualNoMarker').eq(5).children();

  const extractAddressAndEmailPart = part => extractText(addressAndEmail.eq(part));

  const address = `${extractAddressAndEmailPart(0)} - ${extractAddressAndEmailPart(1)} - ${extractAddressAndEmailPart(2)}`;
  const email = extractAddressAndEmailPart(3);

  return {
    address,
    email,
  };
};

const extractDeputyInformations = (html) => {
  const $ = cheerio.load(html);
  const informations = $('ul.visualNoMarker').children();

  const fullName = extractInformation(informations[0]);
  const birthday = extractInformation(informations[1]).replace(' / ', '/');
  const [party, state, type] = extractInformation(informations[2]).split(' / ');
  const main = type === 'Titular';

  const phoneAndFax = informations[3];
  let phone = extractInformation(phoneAndFax);
  phone = phone.substring(0, phone.length - 2);
  const fax = extractInformation(phoneAndFax, 3);

  const legislatures = extractInformation(informations[4]).split(' ');

  return {
    fullName,
    birthday,
    party,
    state,
    main,
    phone,
    fax,
    legislatures,
  };
};

const extractDeputyProfilePictureUrl = (html) => {
  const $ = cheerio.load(html);

  return $('img.image-left')[0].attribs.src;
};

const extractDeputysPartyProfilePictureUrl = (html) => {
  const $ = cheerio.load(html);

  return $('img.rightPositioned.distanciado1.distancia-somente-direita')[0].attribs.src;
};

module.exports = {
  extractDeputies,
  extractDeputyAddressAndEmail,
  extractDeputyInformations,
  extractDeputyProfilePictureUrl,
  extractDeputysPartyProfilePictureUrl,
};
