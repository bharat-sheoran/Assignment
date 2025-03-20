import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createQuestion } from '../../lib/api';

type QuestionForm = {
    question_text: string;
    options: string[];
    correct_answer: string;
};

export function InstructorDashboard() {
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<QuestionForm>();

    const onSubmit = async (data: QuestionForm) => {
        try {
            await createQuestion({
                question_text: data.question_text,
                options: options.filter(option => option.trim() !== ''),
                correct_answer: data.correct_answer,
            });
            reset();
            setOptions(['', '', '', '']);
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Question</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Question Text</label>
                            <textarea
                                {...register('question_text', { required: 'Question text is required' })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows={3}
                            />
                            {errors.question_text && (
                                <p className="mt-1 text-sm text-red-600">{errors.question_text.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                            <div className="space-y-2">
                                {options.map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={options[index]}
                                        onChange={(e) => {
                                            const newOptions = [...options];
                                            newOptions[index] = e.target.value;
                                            setOptions(newOptions);
                                        }}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder={`Option ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                            <select
                                {...register('correct_answer', { required: 'Correct answer is required' })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select correct answer</option>
                                {options.map((option, index) => (
                                    option.trim() && (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    )
                                ))}
                            </select>
                            {errors.correct_answer && (
                                <p className="mt-1 text-sm text-red-600">{errors.correct_answer.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Question
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}