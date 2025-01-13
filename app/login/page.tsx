import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Welcome back</h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>Please sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
