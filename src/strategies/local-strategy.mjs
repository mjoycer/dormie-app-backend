import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "../mongoose/schema/users.mjs";
import bcrypt from "bcrypt";
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside Deserialize User");
  try {
    const findUser = await Users.findById(id);
    console.log(findUser);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const findUser = await Users.findOne({ email: username });
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, findUser.password))
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
