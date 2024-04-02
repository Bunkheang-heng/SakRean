import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../assets/css/Quiz.css";
import { toast } from 'react-toastify';

const Quiz = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBA38XHnqN5IwxgFw-XJ9Sd5ibQ3waRqNU');

    const [answers, setAnswers] = useState({});
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [recommendedMajor, setRecommendedMajor] = useState('');
    const [loading, setLoading] = useState(false);

    const questions =  [
        {
            question: "Which of the following activities do you enjoy the most?",
            options: [
                "Solving math problems",
                "Writing essays or stories",
                "Designing or creating things",
                "Working with computers or technology"
            ]
        },
        {
            question: "What type of environment do you prefer for studying or working?",
            options: [
                "Quiet and structured",
                "Collaborative and social",
                "Outdoors or hands-on",
                "Flexible and adaptable"
            ]
        },
        {
            question: "Which subjects do you excel in or find most interesting?",
            options: [
                "Science or mathematics",
                "Literature or languages",
                "Art or design",
                "Technology or engineering"
            ]
        },
        {
            question: "What motivates you the most in your studies or work?",
            options: [
                "Achieving logical solutions to problems",
                "Expressing creativity and imagination",
                "Making a tangible impact or difference",
                "Developing new skills and knowledge"
            ]
        },
        {
            question: "How do you prefer to approach challenges or tasks?",
            options: [
                "Analyzing and strategizing",
                "Experimenting and exploring",
                "Collaborating and communicating",
                "Innovating and problem-solving"
            ]
        },
        {
            question: "Which career path interests you the most?",
            options: [
                "Scientist or researcher",
                "Writer or journalist",
                "Artist or designer",
                "Programmer or engineer"
            ]
        },
        {
            question: "What are your long-term goals or aspirations?",
            options: [
                "Making groundbreaking discoveries",
                "Inspiring others through storytelling",
                "Creating beautiful and impactful designs",
                "Developing innovative technology solutions"
            ]
        },
        {
            question: "What extracurricular activities or hobbies do you enjoy?",
            options: [
                "Participating in academic competitions",
                "Writing for the school newspaper",
                "Painting or drawing",
                "Coding or building websites"
            ]
        },
        {
            question: "How do you prefer to learn new information or skills?",
            options: [
                "Through logical explanations and examples",
                "Through reading and reflection",
                "Through hands-on experimentation",
                "Through interactive multimedia or technology"
            ]
        },
        {
            question: "What type of work environment do you envision yourself thriving in?",
            options: [
                "Research laboratory or academic setting",
                "Creative studio or media organization",
                "Art gallery or design agency",
                "Tech company or startup"
            ]
        }
    ];

    const handleAnswerSelection = (questionIndex, answer) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    };

    const handleAdditionalInfoChange = (event) => {
        setAdditionalInfo(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const userInterests = Object.values(answers);
            const userPreferences = `${userInterests.join(", ")}. Additional information: ${additionalInfo}`;
            const prompt = `Based on my interests in ${userPreferences}, could you recommend a major and a university in Cambodia that align with my passions?`;
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const recommendedMajor = response.text();
            setRecommendedMajor(recommendedMajor.split('\n'));
            setLoading(false);
            setShowResult(true);
        } catch (error) {
            setLoading(false);
            toast.error("Response blocked due to safety reasons.");
        }
    };

    const renderQuizQuestions = () => {
        return questions.map((question, index) => (
            <div key={index} className="quiz-question">
                <h3>{question.question}</h3>
                {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                        <input
                            type="radio"
                            id={`question${index}_option${optionIndex}`}
                            name={`question${index}`}
                            value={option}
                            onChange={() => handleAnswerSelection(index, option)}
                        />
                        <label htmlFor={`question${index}_option${optionIndex}`}>{option}</label>
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="quiz-container">
            <h2 className='text-3xl mb-10 mt-10 text-center font-bold '>Discover Your Major</h2>
            {!showResult ? (
                <div>
                    {renderQuizQuestions()}
                    <div className="additional-info">
                        <label htmlFor="additional-info">Additional Information (Optional)</label>
                        <textarea
                            id="additional-info"
                            value={additionalInfo}
                            onChange={handleAdditionalInfoChange}
                            rows="4"
                            cols="50"
                        />
                    </div>
                    <center><button onClick={handleSubmit} className='bg-blue-600 p-3 text-white font-bold active:bg-blue-300 rounded-lg '>Submit</button></center>
                </div>
            ) : (
                <div className="quiz-result">
                    <h3 className='mb-10 text-2xl text-center'>Recommended Major</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>{recommendedMajor}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
