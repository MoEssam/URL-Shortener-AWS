const cdk = require('@aws-cdk/core');
const dynamodb = require('@aws-cdk/aws-dynamodb');
const lambda = require('@aws-cdk/aws-lambda');
const path = require('path');
const apigateway = require('@aws-cdk/aws-apigateway');

class UrlShortenerStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    const table = new dynamodb.Table(this, 'mapping-table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    const fn = new lambda.Function(this, 'backend', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./lib/lambda'),
    });
    // The code that defines your stack goes here

    table.grantReadWriteData(fn)
    fn.addEnvironment("TABLE_NAME", table.tableName)

    const fn_api = new apigateway.LambdaRestApi(this, 'api', {
      handler: fn,
    });
  }
}

module.exports = {
  UrlShortenerStack
}