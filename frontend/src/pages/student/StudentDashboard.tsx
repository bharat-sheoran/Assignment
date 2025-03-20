import { useState, useEffect } from 'react';
import { getQuestions } from '../../lib/api';

type Question = {
    _id: string;
    question_text: string;
    options: string[];
    created_by: {
        email: string;
    };
};

export function StudentDashboard() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions();
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSelect = (questionId: string, answer: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    return (
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Questions</h1>

                <div className="space-y-6">
                    {questions.map((question) => (
                        <div key={question._id} className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-gray-900">{question.question_text}</h3>
                                <p className="text-sm text-gray-500">Created by: {question.created_by.email}</p>
                            </div>

                            <div className="space-y-2">
                                {question.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                                    >
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option}
                                            checked={selectedAnswers[question._id] === option}
                                            onChange={() => handleAnswerSelect(question._id, option)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-900">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}