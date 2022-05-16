import jwt from "jsonwebtoken";
import CheckDuplicateField from "../helpers/checkDuplicateField.js";
import newError from "../helpers/customError.js";
import hashField from "../helpers/hashField.js";
import mailer from "../helpers/mailer.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import User from "../models/User.js";
import { registerValidation } from "../validation/authValidation.js";

const register = asyncWrapper(async (req, res, next) => {
  /* Validating the request body. */
  const result = registerValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  /* Checking if the email is already exist in the database. */
  const duplicateEmail = await CheckDuplicateField(
    "email",
    result.value.email,
    User
  );
  if (duplicateEmail) return next(newError("Email is already exist", 400));

  result.value.password = await hashField(result.value.password);

  /* Creating a new user and saving it to the database. */
  const user = new User(result.value);
  await user.save();

  /* Creating a token for the user. */
  const token = jwt.sign(
    { _id: user.id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "900s",
    }
  );

  /* This is the content of the email that will be sent to the user. */
  const subject = "Email confirmation";
  const content = `<!DOCTYPE>
    <html>
      <body>
        <h3>Hi ${user.firstName} ${user.lastName}</h3>
        <p>We just need to verify your email address before you can access .</p>
        <a href="http://localhost:3000/activate-account/${token}" target="_blank" style="text-decoration: none;"><button style="text-align: center;text-decoration: none;background-color: #4eb5f1;color: #ffffff;border: 1px solid #4eb5f1;padding: 10px 30px;border-radius: 25px;display: block;margin: 20px;">Verify Now</button></a>
        <span>This verification will expire in 15 minutes.</span>
      </body>
    </html>`;

  /* This is the code that is sending the email to the user. */
  const sendEmail = await mailer(result.value.email, subject, content);
  if (sendEmail.error)
    return next(newError("Couldn't send verification email.", 500));

  /* This is the response that will be sent to the user after the email is sent. */
  return res.status(201).json({
    message: `We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in our sign-up form.`,
  });
});

export default {
  register,
};
