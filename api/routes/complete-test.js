const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", urlencodedParser, (req, res) => {
    console.log('Path: /complete-test Method: POST')
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.body);
    let testId = req.body.id;
    let educationId = req.body.educationId;
    let answers = req.body.questions;
    let query = `SELECT *
                FROM mydb.question 
                WHERE question.test_id =?`
    pool.query(query, testId, function (err, questions) {
        if (err) return console.log(err);
        if (questions.length != 0) {
            let infoToUserAnswerBD = {
                answer: null,
                score: null,
                question_id: null,
                education_id: educationId
            }
            console.log(questions);
            let commonScore = 0;
            let userScore = 0;
            let queryUserAnswer = 'INSERT INTO mydb.user_answer (answer, score, question_id, education_id) VALUES '
            answers.forEach(answer => {
                let JSONAnswer = JSON.stringify(answer);
                infoToUserAnswerBD.answer = JSONAnswer;
                infoToUserAnswerBD.question_id = answer.id;
                let question = questions.find(question => question.id == answer.id);
                let maxScore = question.question.score;
                commonScore += +maxScore;
                let score = null;
                if (answer.type == 3) {
                    if (answer.ans[0].text == question.question.ans[0].text) {
                        score = question.question.score;
                    } else score = 0;
                    userScore += +score;
                } else if (answer.type == 1) {
                    let userAnswers = answer.ans;
                    let rightAnswers = question.question.ans;
                    userAnswers.forEach(currenAnswer => {
                        let rightCurrentAnswer = rightAnswers.find(item => item.text == currenAnswer.text);
                        if (currenAnswer.right == rightCurrentAnswer.right) score = question.question.score;
                    })
                    if (score == null) score = 0;
                    userScore += +score;
                } else if (answer.type == 2) {
                    score = 0;
                    let userAnswers = answer.ans;
                    let countVar = userAnswers.length;
                    let oneScore = maxScore / countVar;
                    let rightAnswers = question.question.ans;
                    userAnswers.forEach(currenAnswer => {
                        let rightCurrentAnswer = rightAnswers.find(item => item.text == currenAnswer.text);
                        if (currenAnswer.right == rightCurrentAnswer.right) score += oneScore;
                    })
                    userScore += +score;
                }
                infoToUserAnswerBD.score = +score;
                console.log(infoToUserAnswerBD);
                queryUserAnswer += '( \''+infoToUserAnswerBD.answer + '\', ' + infoToUserAnswerBD.score+ ', ' + infoToUserAnswerBD.question_id+ ', ' + infoToUserAnswerBD.education_id+'),'
            })

            let testScore = +userScore / +commonScore * 100;
            console.log ('testScore');
            console.log(testScore);
            console.log(queryUserAnswer);
            console.log(queryUserAnswer.length);
            let newQueryUserAnswer = queryUserAnswer.slice(0, -1);
            console.log(newQueryUserAnswer);
            let round = (Math.round(testScore * 100)/100).toFixed(2);
            
            pool.query(newQueryUserAnswer, [], function (err, data) {
                if (err) return console.log(err);
                console.log(data);
                let query1 = 'UPDATE mydb.education SET test_score = ? WHERE education.id = ?;';
                pool.query(query1, [round, educationId], function(err, data){
                    if (err) return console.log(err);
                    res.sendStatus(200);
                } )
            })
        }
    })
})
module.exports = router;