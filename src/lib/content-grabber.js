const Xray = require('x-ray');
const x = Xray();

const grab = (url) => x(url, {
  h1: 'h1',
  h3: ['h3'],
  a: x('a', [{
    text: '@text',
    href: '@href'
  }])
});

module.exports.grab = grab;