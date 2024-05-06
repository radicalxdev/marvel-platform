/* eslint-disable max-len */
const crypto = require("crypto");

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @return {RegExpMatchArray | null} - An array of matches if the email is valid, or null if it is not.
 */
const emailValidation = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Generates a random token of the specified length.
 *
 * @param {number} length - The length of the token to generate.
 * @return {string} The generated token.
 */
const generateToken = (length) => {
  const token = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);

  return Buffer.from(token)
    .toString("base64")
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=/g, "");
};

module.exports = {
  emailValidation,
  generateToken,
};
