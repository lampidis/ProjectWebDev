'use strict';

const express = require('express');
const router = express.Router();

const chessController = require('../controller/chess-controller');
const logInController = require('../controller/log-in-controller');

//when the client requests a URI, the corresponding controller function will be called


//router.get('/move/:moveId', chessListController.move)

router.route('/').get((req, res) => { res.redirect('/home') });

router.route('/login').get(logInController.checkAuthenticated, logInController.showLogInForm);
//Αυτή η διαδρομή καλείται όταν η φόρμα φτάσει με POST και διεκπεραιώνει τη σύνδεση
router.route('/login').post(logInController.doLogin);
//Αποσυνδέει το χρήστη
router.route('/logout').get(logInController.doLogout);
//FIXME θεωρεί πως POST στο /register σημαίνει πως ο χρήστης δεν είναι συνδεδεμένος
router.post('/register', logInController.doRegister);



router.route('/home').get(logInController.checkAuthenticated, chessController.getHomePage);

//router.get('/home', chessController.getHomePage)

router.get('/lobby', logInController.checkAuthenticated, chessController.getLobby)
router.get('/lobby/users', logInController.checkAuthenticated, chessController.findUserNames)
router.get('/lobby/findGame', logInController.checkAuthenticated, chessController.searchGame)
router.get('/newGame', logInController.checkAuthenticated, chessController.getNewGame)
router.get('/newGame/info', logInController.checkAuthenticated, chessController.getInfo)
router.post('/newGame/plays', chessController.makeMove)
router.get('/newGame/opponentMove', chessController.checkIfFinifhed, chessController.opponentMove)
router.get('/newGame/checkmate', chessController.checkmate)
router.get('/newGame/draw', chessController.draw)

router.get('/playerStats', logInController.checkAuthenticated, chessController.getAllStats)
router.get('/openings', logInController.checkAuthenticated, chessController.getOpenings)
router.get('/selfAnalyzing', logInController.checkAuthenticated, chessController.getSelfAnalyzing)
router.get('/endings', logInController.checkAuthenticated, chessController.getEndings)
router.get('/puzzles', logInController.checkAuthenticated, chessController.getPuzzles)

module.exports = router;