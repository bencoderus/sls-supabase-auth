const { login } = require("../services/auth-service");

module.exports.handler = async (event, context) => {
  const { email, password } = event.body ? JSON.parse(event.body) : {};

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Email and password are required.",
      }),
    };
  }

  const { data, error } = await login({ email, password });

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Unable to login.",
        error: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Login successfully.",
      data,
    }),
  };
};
