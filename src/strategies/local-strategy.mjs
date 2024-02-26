import passport from "passport";
import { Strategy } from 'passport-local';
import { Users } from '../mongoose/schema/users.mjs';

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  try {
    const findUser = Users.findById(id);
    if(!findUser) throw new Error('User not found');
    done(null, findUser)
  } catch(err) {
    done(err, null)
  }
})


export default passport.use(
  new Strategy({usernameField: "email"}, (username, password, done) => {
    try {
      const findUser = Users.findOne(username);
      if(!findUser) throw new Error('User not found');

      let match = bcrypt.compare(password, findUser.password);
      if (!match) throw new Error('Invalid Credentials');

      done(null, findUser)
    } catch(err) {
      done(err, null);
    }
  })
);