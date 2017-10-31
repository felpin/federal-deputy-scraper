const request = require('request-promise-native');

const searchPageHtml = () => request('http://www2.camara.leg.br/deputados/pesquisa');
const deputyPageHtml = id => request(`http://www.camara.leg.br/internet/Deputado/dep_Detalhe.asp?id=${id}`);

module.exports = {
  deputyPageHtml,
  searchPageHtml,
};
