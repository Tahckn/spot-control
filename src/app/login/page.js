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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
      className='max-w-[360px] mx-auto my-[60px] p-10 border-[1px] text-black border-[#ddd] bg-bg-component drop-shadow-lg rounded-sm'
      onSubmit={handleSubmit}>
      <h2 className='font-extrabold text-2xl mb-4'>Login</h2>
      <div className='mb-6'>
        <label htmlFor='email'>
          <span className='flex flex-col text-sm mb-1 '>email:</span>
          <input
            className='drop-shadow-sm py-1 px-1 w-full ring-[1px] ring-gray-200 active:scale-105 transition duration-100 outline-none'
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
            className='drop-shadow-sm py-1 px-1 w-full ring-[1px] ring-gray-200 active:scale-105 transition duration-100 outline-none'
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
          Loading
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </motion.form>
  );
}
