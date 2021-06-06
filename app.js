if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const exphbs = require('express-handlebars');
const session = require("express-session");
const path = require('path');
const url = require('url');

//Διαδρομές - Routse


app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
    resave: true, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
    saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
    cookie: {
      maxAge: 2*60*60*1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
      sameSite: true
    }
}));

const routes = require('./routes/chess-routes');
app.use('/', routes);

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//Χρήση των views - Using 'views'
//Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, 
//αλλιώς δεν θα αναγνωριστεί το extname 
//(αλλιώς τα αρχεία θα πρέπει να τελειώνουν με .handlebars)

app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser())
//app.use(express.urlencoded({ extended: false }));


module.exports = app;


// app.get("/", (req, res) => {
//   console.log("GET / session", req.session);
//   userID = req.session.userID
//   console.log("/get/", userID)
//   if (userID){
//     console.log('userID = ', userID)
//     res.render("login", {user: req.session.userID});
//   } else
//   res.render("login");
// });

// app.post('/', (req, res) => {
//   console.log("POST / session", req.session);
//   console.log("/", req.body.userName);
//   // έχει συμπληρωθεί το userName στη φόρμα
//   // βρες τον χρήστη id ή δημιούργησε χρήστη αν δεν υπάρχει
  
//   req.session.userID = req.body.userName + "id";
//   req.session.userName = req.body.userName;
//   console.log(req.session)
//   res.render("index", {user: req.body.userName})
// })