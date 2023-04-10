const { createAccount } = require("../services/auth-service");

module.exports.handler = async (event, context) => {
  const { name, email, password } = event.body ? JSON.parse(event.body) : {};

  if (!email || !password || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Name, email, and password are required.",
      }),
    };
  }

  const { data, error } = await createAccount({ name, email, password });

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Unable to create account.",
        error: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Account created successfully, please verify your email.",
      data,
    }),
  };
};
