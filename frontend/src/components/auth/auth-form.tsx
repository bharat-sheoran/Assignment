import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '../ui/button';
import { GraduationCap, BookOpen } from 'lucide-react';
import { createUser, getCurrentUser } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import Cookies from 'js-cookie';

type FormData = {
  email: string;
  password: string;
};

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'instructor' | 'student'>('student');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const { userData } = useAuth();

  // Redirect if already authenticated
  if (userData) {
    navigate(userData.role === 'instructor' ? '/instructor' : '/student');
    return null;
  }

  const onSubmit = async (data: FormData) => {
    try {
      let userCredential;
      let currentUser;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        currentUser = await getCurrentUser();
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        currentUser = await createUser(data.email, userCredential.user.uid, role);
      }

      const token = await userCredential.user.getIdToken();
      Cookies.set('auth_token', token, { expires: 7 });
      navigate(currentUser?.data.role === 'instructor' ? '/instructor' : '/student');

      // The token will be automatically set in the cookie by the AuthContext

      // Redirect will happen automatically through the AuthContext
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90% flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to continue learning' : 'Join our learning platform'}
          </p>
        </div>

        {!isLogin && (
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${role === 'student'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <BookOpen className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('instructor')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${role === 'instructor'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <GraduationCap className="w-6 h-6 mx-auto mb-2" />
              <span className="block text-sm font-medium">Instructor</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}