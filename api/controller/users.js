const DbConnector = require("../config/connector");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const con = new DbConnector();

const allUsers = async (req, res, next) => {
    try {
        const sql = "SELECT * FROM ehub.all_users";
        const result = await con.fetchAll(sql);
        displaydata(res, result);
    } catch (error) {
        //res.status(404);
        res.send(error.message);
    }
};

const singleUser = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const sql = "SELECT * FROM ehub.userbyid($1)";
        const result = await con.Query(sql, [userid]);
        displaydata(res, result);
    } catch (error) {
        res.send(error);
    }
};

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(401);
                res.send("try again");
            } else {
                const sql = "SELECT * FROM dev.add_user($1,$2)";
                const result = await con.Query(sql, [email, hash]);
                res.send({ message: "success" });
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};
const updateProfilepic = async (req, res, next) => {
    try {
        const userid = req.body.userid;
        const picture = process.env.FILE_HOST + req.file.path;
        console.log(userid, picture);
        const sql = "SELECT * FROM ehub.updateprofilepic($1, $2)";
        const result = await con.Query(sql, [userid, picture]);

        displaydata(res, result);
    } catch (error) {
        res.send(error.message);
    }
};

const googleauth = async (req, res, next) => {
    const token = jwt.sign(req.user, process.env.JWT_KEY, {
        expiresIn: "6h"
    });
    res.send({
        token: token
    });
};

const login = async (req, res, next) => {
    //const { error } = validateLogin(req.body);
    //if (error) return res.send({ error: error.details[0].message });
    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        const sql = "SELECT * FROM dev.userbyemail($1)";

        const result = await con.Query(sql, [email]);
        //res.send(result);
        if (result.rows.length < 1) {
            res.send("auth failed ");
        } else {
            bcrypt.compare(
                password,
                result.rows[0].password,
                (err, hashres) => {
                    if (err) {
                        res.status(401);
                        res.send("auth failed");
                    }
                    if (hashres) {
                        const token = jwt.sign(
                            {
                                email: result.rows[0].email,
                                id: result.rows[0].id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "6h"
                            }
                        );
                        res.send({
                            token: token
                        });
                    } else {
                        //res.status(401);
                        res.send("auth failed");
                    }
                }
            );
        }
    } catch (error) {
        res.send(error.message);
    }
};

const update_user_profile = async (req, res, next) => {
    try {
        const { id, fname, lname, username, email } = req.body;
        console.log(req.body);
        const sql = "SELECT * FROM ehub.updateuserprofile($1,$2,$3,$4,$5)";
        const result = await con.Query(sql, [
            id,
            fname,
            lname,
            username,
            email
        ]);
        displaydata(res, result);
    } catch (error) {
        res.send({ error: expired });
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        const userid = req.params.id;

        const sql = "SELECT * FROM ehub.deleteUser($1)";
        const result = await con.Query(sql, [userid]);
        displaydata(res, result);
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = { signup, login };
