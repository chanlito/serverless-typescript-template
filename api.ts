import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const api: Handler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Async Lambda!',
      input: event,
    }),
  };
};
