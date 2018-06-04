import {
  Context,
  CustomAuthorizerEvent,
  CustomAuthorizerHandler,
  CustomAuthorizerResult,
  PolicyDocument,
  AuthResponse,
} from 'aws-lambda';

const handler: CustomAuthorizerHandler = async (
  event: CustomAuthorizerEvent,
  context: Context,
): Promise<CustomAuthorizerResult> => {
  console.log('Context?', context);
  const { authorizationToken, methodArn } = event;
  console.log('Token?', authorizationToken);
  console.log('Resource?', methodArn);
  if (!authorizationToken) throw new Error();

  if (authorizationToken === 'Bearer 1234567890') {
    return {
      context,
      ...generatePolicy(1, 'Deny', methodArn),
    };
  }

  return {
    context,
    ...generatePolicy(1, 'Allow', methodArn),
  };
};

const generatePolicy = (
  principalId: any,
  effect: 'Allow' | 'Deny',
  resource: string,
): AuthResponse => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export default handler;
