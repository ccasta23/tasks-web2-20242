import express from "express";
import passport from "passport";
export const authRouter = express.Router();
import { signup } from "../services/auth.service.js";

authRouter.get("/login", async (req, res) => {
    res.render("auth/login");
})

authRouter.get("/signup", async (req, res) => {
    res.render("auth/signup");
})

authRouter.post("/login", passport.authenticate('local', {
        successRedirect: '/tasks',
        failureRedirect: '/auth/login',
    })
)

authRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/auth/login");
        }
    );
})

authRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    await signup(username, password);
    res.redirect("/auth/login");
})