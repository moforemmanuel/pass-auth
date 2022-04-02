const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../models/User');

// configure passport
module.exports = passport => {
    passport.use(new LocalStrategy(
        //override defaults
        { usernameField: 'email' },
        //verify function
        (email, password, done) => {
            //Find and match user
            User.findOne({ email: email })
                .then(user => {
                    //no user
                    if(!user) return done(null, false, { message: "Email is not registered" });

                    //user found, checking password
                    //compare password string and hash
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        //throw error, caught in catch
                        if (err) throw err;

                        //match
                        if (isMatch) return done(null, user);

                        //no match
                        return done(null, false, { message: "Password is incorrect" });
                        
                    });
                })
                .catch(err => {
                    done(err);
                    console.log(err);
                });
        }
    ));

    // passport.serializeUser((user, done) => {
    //     console.log('serializing')
    //     done(null, user.id);
    // });

    // passport.deserializeUser((id, done) => {
    //     console.log('deserializing')

    //     User.findById(id, (err, user) => {
    //         console.log(user);
    //         done(err, user);
    //     });
    // });

};