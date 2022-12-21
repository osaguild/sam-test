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
  console.log("result", result);

  return result["MessageId"] as string;
};

const lambdaHandler = async (event: any, context: any) => {
  console.log("id", process.env.AWS_ACCESS_KEY_ID);
  console.log("secret", process.env.AWS_SECRET_ACCESS_KEY);
  let response;
  try {
    const messageId = await sendMessage();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `hello world with sqs. messageId: ${messageId}`,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

export { lambdaHandler };
