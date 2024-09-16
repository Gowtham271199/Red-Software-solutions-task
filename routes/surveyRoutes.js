const express = require('express');
const { createSurvey, takeSurvey, getSurveyResults } = require('../controllers/surveyController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/survey', verifyToken, createSurvey);
router.post('/survey/take', verifyToken, takeSurvey);
router.get('/survey/:surveyId', verifyToken, getSurveyResults);

module.exports = router;
