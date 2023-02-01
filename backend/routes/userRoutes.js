const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const passport = require("passport");

//sign up route
router.post("/signup", (req, res, next) => {
  const userName = req.body.username;
  const userPassword = req.body.password;

  if (!userName || !userPassword) {
    res.status(400).json({ message: "Please enter username and/or password" });
    return;
  }

  User.findOne({ username: userName }, (err, foundUser) => {
    if (err) {
      res.status(500).json({
        message: "Username check went bad.",
      });
      return;
    }

    if (foundUser) {
      res.status(400).json({
        message: "Username taken. Choose another one.",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(userPassword, salt);

    const newUser = new User({
      username: userName,
      password: hashPass,
      favorite: [],
    });

    newUser.save((err) => {
      if (err) {
        res.status(400).json({
          message: "Saving user to database went wrong.",
        });
        return;
      }

      // Automatically log in user after sign up
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({
            message: "Login after signup went bad.",
          });
          return;
        }

        res.status(200).json({
          message: "successfully logged in",
        });
      });
    });
  });
});

//log In route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json({ message: "Incorrect username or password" });
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      //now log in
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//log out route
router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

//currentUser route
router.get("/getcurrentuser", (req, res, next) => {
  if (req.user) {
    let newObject = {};
    newObject.username = req.user.username;
    newObject._id = req.user._id;

    res.status(200).json(newObject);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
