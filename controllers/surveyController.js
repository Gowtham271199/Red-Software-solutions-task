const Survey = require('../models/Survey');
const Question = require('../models/Question');

exports.createSurvey = async (req, res) => {
    try {
        const { title, questions } = req.body;

        const newSurvey = new Survey({ title, createdBy: req.user.username });
        await newSurvey.save();

        const surveyQuestions = questions.map(q => ({
            text: q.text,
            type: q.type,
            survey: newSurvey._id
        }));

        const createdQuestions = await Question.insertMany(surveyQuestions);
        newSurvey.questions = createdQuestions.map(q => q._id);
        await newSurvey.save();

        res.json(newSurvey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.takeSurvey = async (req, res) => {
    const { surveyId, answers } = req.body;

    const survey = await Survey.findById(surveyId);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });

    // Here, we would store the user's answers. This is a simplified response.
    res.json({ message: 'Survey submitted successfully' });
};

exports.getSurveyResults = async (req, res) => {
    const { surveyId } = req.params;

    const survey = await Survey.findById(surveyId).populate('questions');
    if (!survey) return res.status(404).json({ message: 'Survey not found' });

    res.json(survey);
};
