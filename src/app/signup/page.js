'use client';
import { useState } from 'react';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  return (
    <form className='max-w-[360px] mx-auto my-[60px] p-10 border-[1px] text-black border-[#ddd] bg-bg-component drop-shadow-lg rounded-sm'>
      <h2 className='font-extrabold text-2xl mb-4'>Sign Up</h2>
      <div className='mb-6'>
        <label for='email'>
          <span className='flex flex-col text-sm mb-1 '>email:</span>
          <input className='drop-shadow-sm py-1 px-1 w-full ring-[1px] ring-gray-200 active:scale-105 transition duration-100 outline-none'
            id='email'
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
      </div>
      <div className='mb-6'>
        <label for='password'>
          <span className='flex flex-col text-sm mb-1'>password:</span>
          <input className='drop-shadow-sm py-1 px-1 w-full ring-[1px] ring-gray-200 active:scale-105 transition duration-100 outline-none'
            id='password'
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
      </div>
      <div className='mb-6'>
        <label for='displayName'>
          <span className='flex flex-col text-sm mb-1'>display name:</span>
          <input className='drop-shadow-sm py-1 px-1 w-full ring-[1px] ring-gray-200 active:scale-105 transition duration-100 outline-none'
            id='displayName'
            type='password'
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
      </div>
      <div className='mb-6'>
        <label for='file'>
          <span>profile thumbnail:</span>
          <input className='bg-white py-1 px-1 w-full ring-[1px] ring-gray-200' id='file' type='file' required accept='image/png, image/jpeg'/>
        </label>
      </div>
      <button className='btn'>Sign up</button>
    </form>
  );
}
