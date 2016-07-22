const expect = require('chai').expect,
      decorator = require('../index')

describe('Set environment decorator', function() {
  const emptyCallback = () => {};

  it(`should set context.environment to the lambda alias when arn has one`, (done) => {
    const sampleContext = {
            invokedFunctionArn: `arn:aws:lambda:eu-west-1:438423213058:function:prophecy-user-conf-lambda:ALIAS`
          },
          testHandler = (event,context,callback) => {
            expect(context.environment).to.equal('ALIAS')
            done()
          };

    decorator(testHandler)({}, sampleContext, emptyCallback)
  })

  it('should set context.environment to $LATEST when arn has no alias', (done) => {
    const sampleContext = {
            invokedFunctionArn: `arn:aws:lambda:eu-west-1:438423213058:function:prophecy-user-conf-lambda`
          },
          testHandler = (event,context,callback) => {
            expect(context.environment).to.equal('$LATEST')
            done()
          };

    decorator(testHandler)({}, sampleContext, emptyCallback)
  })

})
