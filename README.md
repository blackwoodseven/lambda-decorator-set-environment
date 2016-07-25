# lambda-decorator-set-environment
AWS Lambda decorator to attach `environment` property to the `context` object by parsing the function version alias of the `invokedFunctionArn`

## Usage
First, you'll need to add it to the dependencies:
```bash
npm install git+ssh://git@github.com:blackwoodseven/lambda-decorator-set-environment.git#v1.0.0
```
Note that you should specify which version you need by indicating the git tag after the hash.

Once installed, you can enable it just passing the handler function:
```js
const setEnvironmentDecorator = require('lambda-decorator-set-environment')
const handler = require('./handler')

exports.handler = setEnvironmentDecorator(handler)
```
Once it is used, the `context` object received by the *handler* function will contain the `envrionment` property that will match the alias name that was used to call the lambda function, or `'$LATEST'` if none provided.
