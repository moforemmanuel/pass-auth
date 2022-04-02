const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = {
    userAuth: (req, res) => {
        const {userName, email, phone, password, password2 } = req.body;
        let errors = [];

        //check required fields
        if (!(userName && email && phone && password && password2)) {
            errors.push({
                msg: 'Please fill in all fields'
            });
        }

        //check passwords
        if (password !== password2) errors.push({ msg: 'Passwords do not match' });

        //password length check
        if (password.length < 8) errors.push({ msg: 'Password must be atleast 8 characters long' });
        

        //check password format
        const passPat = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
        if(passPat.test(password)) errors.push({ msg: 'Password must contain atleast one lowercase, uppercase, special character, and a number' });

        //if errors, resend form
        if (errors.length > 0){
            res.render('register', {
                errors,
                userName,
                email,
                phone
            })
        } else {
            // register user

            //check if email exists
            User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        errors.push({ msg: 'Email is already registered' });
                        res.render('register', {
                            errors,
                            userName,
                            phone,
                            password,
                            password2

                        })
                    } else {
                        // new user
                        // let isVerified = false;
                        const newUser = new User({
                            userName,
                            email,
                            phone,
                            password
                        });

                        // req.flash('userEmail', newUser.email);
                        req.session.email = newUser.email;
                        // res.locals.userEmail = newUser.email;
                        //pass user email
                        // axios.post('http:localhost:5000/users/verify', 
                        // {
                        //     userEmail: newUser.email
                        // })
                        // .then(response => console.log(response))
                        // .catch(err => console.log(err));

                        //hash passord
                        //generate salt
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;

                                //set hashed as pass
                                newUser.password = hash;

                                //save user
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'You are now registered, please verify your email to continue');
                                        res.redirect('/users/verify-by-email');
                                        // res.json(req.flash);
                                    })
                                    .catch(err => console.log(err));
                            })
                        })

                    }
                })
        }
        // return userEmail;
    }

    
}