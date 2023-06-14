import * as AWS from 'aws-sdk';

export namespace AwsNamespace {
  const accessKey = process.env.CLOUD_AWS_ACCESS_KEY_ID || null;
  const secretKey = process.env.CLOUD_AWS_SECRET_ACCESS_KEY || null;

  AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'ap-northeast-2',
  });

  export const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
}
