const lambdaHandler = async (event, context) => {
  let response;
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `hello world with typescript with env1: ${process.env.ENV1}, env2: ${process.env.ENV2}`,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

export { lambdaHandler };
