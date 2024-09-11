# Follow these steps to convert HTML to PDF

- Step 1 - install the pdf generator package using the following command

  `$ npm i pdf-generator-node --save`

  > --save flag adds package name to package.json file.

- Step 2 - Add required packages and read HTML template

  ```javascript
  //Required package
  var pdf = require("pdf-generator-node");
  var fs = require("fs");

  // Read HTML Template
  var html = fs.readFileSync("template.html", "utf8");
  ```

- Step 3 - Create your HTML Template

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Hello world!</title>
    </head>
    <body>
      <h1>User List</h1>
      <ul>
        {{#each users}}
        <li>Name: {{this.name}}</li>
        <li>Age: {{this.age}}</li>
        <br />
        {{/each}}
      </ul>
    </body>
  </html>
  ```

- Step 4 - Provide pdf options
    ```javascript
        var options = {
            format: "A3",
            landscape: false,
            margin: {
              top:"10mm",
              bottom:"10mm",
              left:"10mm",
              right:"10mm"
            },
            headerTemplate: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
            },
            footerTemplate: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };
    ```
    
- Step 5 - Provide HTML, user data and PDF path for output

  ```javascript
  var users = [
    {
      name: "Shyam",
      age: "26",
    },
    {
      name: "Navjot",
      age: "26",
    },
    {
      name: "Vitthal",
      age: "26",
    },
  ];
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "./output.pdf",
    type: "buffer", // buffer || stream
  };
  ```

- Step 6 - After setting all parameters, just pass document and options to `pdf.create` method.

  ```javascript
  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
  ```

### If Conditional Checks
You can do conditional checks by calling helper block _ifCond_ example

```js
{{#ifCond inputData "===" toCheckValue}}
```

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Hello world!</title>
    </head>
    <body>
      <h1>User List</h1>
      <ul>
        {{#each users}}
        <li>Name: {{this.name}}</li>
        <li>Age: {{#ifCond this.age '===' '26'}}</li>
        <br />
        {{/ifCond}}
        {{/each}}
      </ul>
    </body>
  </html>
  ```

Can check variables with different type ie _string_, _integer_, _boolean_, _double_

Other logical operators are-:

- ==
   ```js
    {{#ifCond inputData "==" toCheckValue}}
   ```
- ===
   ```js
    {{#ifCond inputData "===" toCheckValue}}
   ```
- != 
   ```js
    {{#ifCond inputData "!=" toCheckValue}}
   ```
- !==
   ```js
    {{#ifCond inputData "!==" toCheckValue}}
   ```
- <
   ```js
    {{#ifCond inputData "<" toCheckValue}}
   ```
- <=
   ```js
    {{#ifCond inputData "<=" toCheckValue}}
   ```
- '>
   ```js
    {{#ifCond inputData ">" toCheckValue}}
   ```
- '>=
   ```js
    {{#ifCond inputData ">=" toCheckValue}}
   ```
- &&
   ```js
    {{#ifCond inputData "&&" toCheckValue}}
   ```
- ||
   ```js
    {{#ifCond inputData "||" toCheckValue}}
   ```

##NOTE!!
You can only match 2 variables

### End

### License

pdf-creator-node is [MIT licensed](./LICENSE).
