const User = require("../models/User");

module.exports = (req, accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    // return done(null, profile);

    asynchorous
    process.nextTick( () => {
        //find user in db based on their fb id
        User.findOne({'email': profile.emails[0].value}, (err, user) => {
            //errors, db conn err or etc
            if (err) {
                return done(err);
            }

            //user found case
            if (user) {
                console.log('user found');
                return done(null, user) // return found userr
            } else {
                //user not found
                console.log('creating user');
                // console.log(profile.id);
                // let isVerified = false;
                const newUser = new User({
                    // _id: profile.id,
                    provider: profile.provider,
                    providerID: profile.id,
                    name: profile.displayName || '',
                    token: accessToken,
                    email: profile.emails[0].value,
                    phone: profile.phone || '',
                    gender: profile.gender || '',
                    pic: profile.photos[0].value,
                    // isVerified: isVerified

                });

                //save user
                newUser.save( err => {
                    if (err) throw err;
                    return done(null, newUser);
                });

            }
        });
    });

}