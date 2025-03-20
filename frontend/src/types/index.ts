export type User = {
    email: string;
    role: 'instructor' | 'student';
    firebase_uid: string;
};

export type Question = {
    _id: string;
    question_text: string;
    options: string[];
    correct_answer: string;
};