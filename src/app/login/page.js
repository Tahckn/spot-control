'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLogin } from '@/hooks/useLogin';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <motion.form
      layout
      initial={{ y:80, opacity: 0 }}
      animate={{ y:0, opacity: 1, transition: { duration: 0.5 } }}
      className='max-w-[360px] mx-auto my-[60px] p-10 border-[1px] text-text-color border-[#353537] bg-bg-component drop-shadow-lg rounded-sm'
      onSubmit={handleSubmit}>
      <h2 className='font-extrabold text-2xl mb-4'>Login</h2>
      <div className='mb-6'>
        <label htmlFor='email'>
          <span className='flex flex-col text-sm mb-1 '>email:</span>
          <input
            className='drop-shadow-sm w-full active:scale-105 transition duration-100 outline-none'
            id='email'
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
      </div>
      <div className='mb-6'>
        <label htmlFor='password'>
          <span className='flex flex-col text-sm mb-1'>password:</span>
          <input
            className='drop-shadow-sm w-full active:scale-105 transition duration-100 outline-none'
            id='password'
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
      </div>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && (
        <button className='btn' disabled>
          <svg
            aria-hidden='true'
            role='status'
            class='inline w-4 h-4 mr-3 text-white animate-spin'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='#242529'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='#fdf17e'
            />
          </svg>
          Loading...
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </motion.form>
  );
}
