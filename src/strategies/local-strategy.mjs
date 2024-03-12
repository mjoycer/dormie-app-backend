import passport from "passport";
import { Strategy } from 'passport-local';
import { Users } from '../mongoose/schema/users.mjs';
import bcrypt from 'bcrypt';

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
  new Strategy({usernameField: "email"}, async (username, password, done) => {
    
    try {
      const findUser = await Users.findOne({email: username});
      if(!findUser) throw new Error('User not found');

      let match = bcrypt.compareSync(password, findUser.password)
      if (!match) throw new Error('Invalid Credentials');
      done(null, findUser)
    } catch(err) {

      done(err, null);
    }
  })
);