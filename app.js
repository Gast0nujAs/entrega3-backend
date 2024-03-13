import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_URL, ttl: 1000* 60 * 60
        }),
        secret: COOKIE_SECRET,
        saveUninitialized: false,
        resave: true,
        cookie: { maxAge: 1000 * 60 * 60 },
    })
);

configPassport();
app.use(passport.initialize());
app.use(passport.session());    

const hbs = handlebars.create({
    helpers: {
        eq(a, b) {
            return a === b;
        },
    }, 
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "src/views");
app.set("view engine", "handlebars");
