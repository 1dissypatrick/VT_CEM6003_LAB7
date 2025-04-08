import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "koa-router";
import * as users from '../models/users';

passport.use(new BasicStrategy(async (username, password, done) => {
  try {
    const user = await users.findByUsername(username);
    
    if (!user) {
      console.log(`No user found with username ${username}`);
      return done(null, false);
    }
    
    if (users.verifyPassword(user, password)) {
      return done(null, { user });
    } else {
      console.log(`Password incorrect for ${username}`);
      return done(null, false);
    }
  } catch (error) {
    console.error(`Error during authentication for user ${username}: ${error}`);
    return done(error);
  }
}));

export const basicAuth = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false })(ctx, next);
  if (ctx.status === 401) {
    ctx.body = { message: 'You are not authorized' };
  }
}