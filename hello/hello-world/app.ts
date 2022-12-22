import * as aws from "aws-sdk";

const queueUrl = `${process.env.SQS_URL}/add-wallet`;
aws.config.update({
  accessKeyId: process.env.LAMBDA_ID || "dummy",
  secretAccessKey: process.env.LAMBDA_SECRET || "dummy",
  region: process.env.AWS_REGION || "ap-northeast-1",
});
const sqs = new aws.SQS({
  apiVersion: "2012-11-05",
});

const sendMessage = async () => {
  const params = {
    DelaySeconds: 5,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "add wallet",
      },
      Author: {
        DataType: "String",
        StringValue: "api",
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6",
      },
    },
    MessageBody: JSON.stringify({ message: "hello world" }),
    QueueUrl: queueUrl,
  };
  const result = await sqs.sendMessage(params).promise();

  return result["MessageId"] as string;
};

const send = async (event: any, context: any) => {
  console.log("id:", process.env.LAMBDA_ID, "/ secret:", process.env.LAMBDA_SECRET);
  let response;
  try {
    const messageId = await sendMessage();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `sent message to sqs. messageId: ${messageId}`,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

const receiveMessage = async () => {
  const receiveParams = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 1,
    MessageAttributeNames: ["Title", "Author", "WeeksOn"],
  };
  const result = await sqs.receiveMessage(receiveParams).promise();
  const message = (result.Messages as aws.SQS.Message[])[0];

  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: message.ReceiptHandle as string,
  };
  await sqs.deleteMessage(deleteParams).promise();

  return message;
};

const receive = async (event: any, context: any) => {
  console.log("id:", process.env.LAMBDA_ID, "/ secret:", process.env.LAMBDA_SECRET);
  let response;
  try {
    const message = await receiveMessage();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `received message from sqs. message: ${JSON.parse(message.Body as string).message}`,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

export { send, receive };
