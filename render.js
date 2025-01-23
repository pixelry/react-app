const path = require('path');
const fs = require('fs');

const server = require(path.resolve('.', './out/server.js'));

module.exports = async function render(
  routes = ['/'],
  domain = 'localhost:8888',
) {
  const html = fs.readFileSync(path.resolve('.', './dist/index.html'), 'utf-8');
  const sitemap = [];

  for (let route of routes) {
    sitemap.push(`${domain}${route}`.replace(/\/$/, ''));
    console.log(`rendering ${route}`);
    const data = server.render(route);

    const output = html.replace(
      '<div id="main"></div>',
      `<div id="main">${data}</div>`,
    );

    const exists = fs.existsSync(path.resolve('.', `./dist${route}`));
    if (!exists) {
      fs.mkdirSync(path.resolve('.', `./dist${route}`), {
        recursive: true,
      });
    }
    fs.writeFileSync(path.resolve('.', `./dist${route}/index.html`), output);
  }

  // publish the sitemap
  fs.writeFileSync(path.resolve('.', `./dist/sitemap.txt`), sitemap.join('\n'));
};
