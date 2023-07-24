import passport from "passport";
import GithubStrategy from "passport-github2";
import userModel from "../models/user.model.js";
import { createHash } from "./bcrypt.js";
// import fs from 'fs';
import dotenv from 'dotenv';

const initializePassportGH = () => {

// GITHUB AUTHENTICATION APP
    dotenv.config({ path: './.env.github' })
        // console.log('--github_app - CLIENT_ID:     ', process.env.CLIENT_ID );
        // console.log('--github_app - CLIENT_SECRET: ', process.env.CLIENT_SECRET );
        // console.log('--github_app - CALLBACK_URL:  ', process.env.CALLBACK_URL);

    passport.use('github', new GithubStrategy({
        clientID:       process.env.CLIENT_ID ,//githubApp.clientID,
        clientSecret:   process.env.CLIENT_SECRET ,//githubApp.clientSecret,
        callbackURL:    process.env.CALLBACK_URL ,//githubApp.callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('--- profile: ', profile);
        console.log('[github2] Autorizado OK ✅');
        try {
            const user = await userModel.findOne({email: profile._json.email})
            if (user) return done(null, user)
            const newUser = await userModel.create({
                first_name: profile._json.name,
                // lastname: profile._json.lastname,
                email: profile._json.email,
                role: 'user',
            })
            return done(null, newUser)
        } catch (error) {
            return done('[github2] Error al iniciar sesión con Github ❌')
        }
    }
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser( async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    }) 

}

export default initializePassportGH