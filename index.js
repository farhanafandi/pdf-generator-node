/**
 * @author Farhan Afandi <farhan.edi.a@gmail.com>
 */

/**
 * create function is used to create pdf from handlebar templates.
 * @param  {document, options}
 * @return {callback}
 */

var Handlebars = require("handlebars");
var PuppeteerHTMLPDF = require("puppeteer-html-pdf");

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

var create = function (document, options) {
  return new Promise(async (resolve, reject) => {
    if (!document || !document.html || !document.data) {
      reject(new Error("Some, or all, options are missing."));
    }
    // Compiles a template
    var html = Handlebars.compile(document.html)(document.data);
    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setOptions(options);
    const pdfPromise = htmlPDF.create(html);

    switch (document.type) {
      case "buffer":
        resolve(pdfPromise)
        break;

      case "stream":
        const pdfBuffer = await pdfPromise;
        const stream = require('stream');
        const readableStream = new stream.Readable({
          read() {
            this.push(pdfBuffer);
            this.push(null);
          }
        });
        resolve(readableStream);
        break;

      default:
        resolve(htmlPDF.writeFile(pdfPromise, document.path))
        break;
    }
  });
};

module.exports.create = create;
