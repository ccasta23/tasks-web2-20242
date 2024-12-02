import passport from 'passport';
import './strategies/local.strategy.js';
import {sequelize} from '../libs/sequelize.js';


export function configurePassport(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await sequelize.models.user.findByPk(id);
        done(null, user);
    });
}