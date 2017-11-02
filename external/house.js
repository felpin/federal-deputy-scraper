const request = require('request-promise-native');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0',
  },
};

const searchPageHtml = () => request('http://www2.camara.leg.br/deputados/pesquisa', options);
const deputyPageHtml = id => request(`http://www.camara.leg.br/internet/Deputado/dep_Detalhe.asp?id=${id}`, options);

module.exports = {
  deputyPageHtml,
  searchPageHtml,
};
