const { json } = require('express');
const userService = require('../service/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class UserController {
    async Register(req, res) {
        try {
            //Check body
            const { email, password } = req.body;
            if (email == null || password == null || email == "" || password == "") {
                res.status(400).json(
                    {
                        "error": true,
                        "message": "Request body incomplete, both email and password are required"
                    })
                return
            }
            const reg = await userService.Register(req.body);
            res.status(200).json(reg);
        } catch (err) {
            //user already exists
            if (err.errno == 1062) {
                res.status(409).json({
                    "error": true,
                    "message": "User already exists"
                });
            } else {
                res.status(500).json(err);
            }
        }
    }

    async Login(req, res) {
        try {
            //Check body
            const { email, password } = req.body;
            if (email == null || password == null || email == "" || password == "") {
                res.status(400).json(
                    {
                        "error": true,
                        "message": "Request body incomplete, both email and password are required"
                    })
                return
            }

            const user = await userService.getUser(req.body);
            const token = jwt.sign({ user }, 'CAB230', { expiresIn: '15s' });
            //no user
            if (user == undefined) { res.status(401).send({ "error": true, "message": "Incorrect email or password" }); return; }
            //authentication
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.status(200).send({ "token": token, "token_type": "Bearer", "expires_in": 86400 });
            } else {
                res.status(401).send({ "error": true, "message": "Incorrect email or password" });
                return
            }
        } catch (err) {
            res.status(500).json(err);
        }
        return;
    }

    async getProfile(req, res) {
        try {
            const bearerHeader = req.headers["authorization"];
            //Get public profile, when user has no token
            if (typeof bearerHeader == 'undefined') {
                const profile = await userService.getPublicProfile(req.params);
                if (profile != null) res.status(201).json(profile);
                else res.status(404).json({ "error": true, "message": "User not found" });
                return
            }
            //with token
            jwt.verify(req.token, 'CAB230', async function (err, data) {
                let profile;
                if (err) {
                    res.status(401).json({
                        "error": true,
                        "message": "JWT token has expired"
                    });
                    return
                }
                else if (data.user.email !== req.params.email) {
                    profile = await userService.getPublicProfile(req.params);
                }
                else {
                    //protected
                    profile = await userService.getPrivateProfile(req.params);
                }
                if (profile == null) {
                    res.status(404).json({ "error": true, "message": "User not found" });
                    return
                }
                else {
                    res.status(200).json(profile);
                }
            });
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async updateProfile(req, res) {
        try {
            //Check body
            const { first_name, last_name, dob, address } = req.body;
            if (first_name == null || last_name == null || dob == null | address == null || first_name == "" || last_name == "" || dob == "" | address == "") {
                res.status(400).json(
                    {
                        "error": true,
                        "message": "Request body incomplete: firstName, lastName, dob and address are required."
                    })
                return
            }

            //check token exists
            const bearerHeader = req.headers["authorization"];
            if (typeof bearerHeader == 'undefined') {
                res.status(401).json({
                    "error": true,
                    "message": "Authorization header ('Bearer token') not found"
                });
                return
            }

            jwt.verify(req.token, 'CAB230', async function (err, data) {
                if (err || data.user.email !== req.params.email) {
                    //unprotected
                    res.status(403).json({
                        "error": true,
                        "message": "Forbidden"
                    });
                    return
                } else {
                    //protected
                    const profile = await userService.updateProfile(req);
                    res.status(200).json(profile);
                }
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController();