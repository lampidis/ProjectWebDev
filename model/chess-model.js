'use strict';
const fs = require('fs');
const lockFile = require('lockfile')

//where tasks are stored
const lock = './model/lock-file'


exports.getHomePage = function (callback) {
    lockFile.lock(lock, (err, isLocked) => {
        //We open the file ./model/tasks.json, read the content and save it in variable
        //'data'
        if (err) {
            callback(err)
        }
        else {
            fs.readFile(tasksFile, (err, data) => {
                lockFile.unlock(lock)
                if (err) {
                    callback(err)
                }
                callback(null, JSON.parse(data))
            })
        }
    })
}

exports.insertUser = (userName, callback) => {
    // εισαγωγή νέου χρήστη, και επιστροφή στο callback της νέας εγγραφής
    const sql = "INSERT INTO Users(userName) VALUES (?)"
    db = new sqlite3.Database(db_name);
    db.run(sql, [userName], err => {
        if (err) {
            db.close();
            callback(err, null)
        }
        db.close();
        console.log('1 new user inserted');
    });
}

exports.findUser = (userID=null, userName=null, callback) => {
    // εύρεση χρήστη με βάση τον κωδικό ή το όνομά του.
    // χωρίς μυστικό κωδικό για λόγους απλότητας
    const sql = (userID) ? "SELECT * FROM Users WHERE UserID = ?" : 
        "SELECT * FROM Users WHERE UserName = ?";
    console.log('new sql...', sql)
    const db = new sqlite3.Database(db_name);
    db.all(sql, [userID || userName], (err, row) => {
        console.log("findUser")
        if (err || row.length === 0) {
            // ο χρήστης δεν υπάρχει, πρέπει να δημιουργηθεί
            db.close();
            this.insertUser(userName, (err, newUser) => {
                console.log("newuser", newUser);
                if (err) {
                    callback(err, null);
                } else
                this.findUser(userID=userID, userName=userName, callback);
            });
        }
        else {
            db.close();
            callback(null, row)
        }
    });
}