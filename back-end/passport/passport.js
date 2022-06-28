const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../schema/User')

module.exports = function (passport) {
    passport.use('local',
        new LocalStrategy(
            { usernameField: "userName" },
            async (userName, password, done) => {
                console.log(userName, password)
                const user = await User.findOne({ username: userName })
                if (!user) {
                    done('No user found', false)
                } else {
                    bcrypt.compare(password, user.password, (err, isMatched) => {
                        if (isMatched) {
                            done(null, user)
                        } else {
                            done("worng password", false)
                        }
                    })
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (_id, done) => {
        const user = await User.findById(_id);

        done(null, user);
    })
}