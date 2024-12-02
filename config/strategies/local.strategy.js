import passport from "passport";
import LocalStrategy from 'passport-local'
import {sequelize} from '../../libs/sequelize.js'

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await sequelize.models.user.findOne(
                { where: { 
                    username: username,
                    password: password
                } }
            )
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            return done(null, user)
        } catch (error) {
            return done(error);
        }
    })
)
