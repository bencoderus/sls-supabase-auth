const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

const supabase = () => createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Create an account.
 *
 * @param {{email: string, password: string, name: string}} params
 * @returns {Promise<any>}
 */
module.exports.createAccount = async ({ email, password, name }) => {
  return supabase().auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
};

/**
 * Validate user credentials and generate JWT token.
 *
 * @param {{email: string, password: string}} params
 * @returns {Promise<any>}
 */
module.exports.login = async ({ email, password }) => {
  return supabase().auth.signInWithPassword({
    email,
    password,
  });
};
