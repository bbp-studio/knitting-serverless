import { Injectable } from '@nestjs/common';
import { Token } from '../../common/token/token';
import { AwsNamespace } from '../../core/aws/aws.namespace';
import { OauthType, UserDEntity, UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  async findByIdAndType(oauthId: string, type: OauthType): Promise<UserEntity> {
    const response = await AwsNamespace.dynamoDbClient
      .query({
        TableName: 'user',
        KeyConditionExpression: 'oauthId = :oauthId and oauthType = :oauthType',
        ExpressionAttributeValues: {
          ':oauthId': oauthId,
          ':oauthType': type,
        },
      })
      .promise();

    if (response.Items.length == 0) {
      return null;
    }

    return UserEntity.of(response.Items[0] as UserDEntity);
  }

  async save(user: UserEntity) {
    const response = await AwsNamespace.dynamoDbClient
      .put({
        TableName: 'user',
        Item: user.toDdb(),
      })
      .promise();

    console.log(`response: ${JSON.stringify(response)}`);

    return;
  }

  async findByAccessToken(token: Token): Promise<UserEntity> {
    const response = await AwsNamespace.dynamoDbClient
      .query({
        TableName: 'user',
        KeyConditionExpression: 'userOauthMetadata.accessToken = :accessToken',
        ExpressionAttributeValues: {
          ':accessToken': token,
        },
      })
      .promise();

    if (response.Items.length == 0) {
      return null;
    }

    return UserEntity.of(response.Items[0] as UserDEntity);
  }

  async removeTokens(oauthId: string, type: OauthType) {
    const response = await AwsNamespace.dynamoDbClient
      .update({
        TableName: 'user',
        Key: {
          oauthId,
          oauthType: type,
        },
        UpdateExpression: 'SET accessToken=:nullValue, refreshToken=:nullValue',
        ExpressionAttributeValues: {
          ':nullValue': null,
        },
      })
      .promise();

    console.log(`response: ${JSON.stringify(response)}`);

    return;
  }

  // async put() {
  //   const response = await AwsNamespace.dynamoDbClient
  //     .put({
  //       TableName: 'user',
  //       Item: {
  //         id: 1,
  //         name: 'test',
  //         age: 20,
  //       },
  //     })
  //     .promise();
  // }
  //
  // async list() {
  //   const response = await AwsNamespace.dynamoDbClient
  //     .query({
  //       TableName: 'user',
  //       KeyConditionExpression: 'id = :id',
  //       ExpressionAttributeValues: {
  //         ':id': 1,
  //       },
  //     })
  //     .promise();
  // }
}
