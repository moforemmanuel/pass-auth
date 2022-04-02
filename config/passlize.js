
module.exports = passport => {
    passport.serializeUser( (user, done ) => {
        done(null, user);
    });

    // passport.deserializeUser( (id, done) => {
    //     model.findById(id, (err, user) => {
    //         console.log(user);
    //         done(err, user);
    //     });
    // });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
}