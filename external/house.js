const request = require('request-promise-native');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0',
  },
};

const houseDeputyUrl = 'http://www.camara.leg.br/internet/Deputado';

const searchPageHtml = () => request('http://www2.camara.leg.br/deputados/pesquisa', options);
const deputyPageHtml = id => request(`${houseDeputyUrl}/dep_Detalhe.asp?id=${id}`, options);

module.exports = {
  houseDeputyUrl,
  deputyPageHtml,
  searchPageHtml,
};
