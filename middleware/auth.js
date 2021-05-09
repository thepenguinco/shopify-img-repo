const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Signup
passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      
        // Validate email, password
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        console.log("MADE IT 2");
        if (user) {
            done({ status: 406, info: "User already exists" });
        } else {
            // Create new user with email
            const hashedPassword = await bcrypt.hash(password, 10);
            return done(null, { hashedPassword: hashedPassword });
        }
    }
  )
);

const validatePassword = async (inputPassword, actualPassword) => {
  // Validate a given password with another
  return await bcrypt.compare(inputPassword, actualPassword);
};

// Login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.users.findUnique({
          where: {
              email: email
          }
        });
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: "User not found" });
        }
        const validate = await validatePassword(password, user.password);

        if (!validate) {
          console.log("Wrong password");
          return done(null, false, { message: "Wrong Password" });
        }

        return done(
          null,
          { email: email },
          { message: "Logged in Successfully" }
        );
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

