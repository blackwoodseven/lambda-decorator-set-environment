
//ARN has the following form:
//arn:aws:lambda:${region}:${aws_account_id}:function:${lambda_fn_name}[:${alias}]
const getEnvironmentFromArn = (arn) => {
  try {
    return arn.split(':function:').pop().split(':')[1] || '$LATEST'
  } catch (err) {
    throw new Error('Can not extract envrionment from invokedFunctionArn, missing in context?')
  }
}

// Sets context.environment to the current environment the lambda is executing in
module.exports = (handlerFn) => (event, context, callback) => {
  const extendedContext = Object.assign({}, context, {
      environment : getEnvironmentFromArn(context.invokedFunctionArn)
  })
  return handlerFn(event, extendedContext, callback)
}
