'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSignup } from '@/hooks/useSignup';


export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [preview, setPreview] = useState();
  const { signup, isPending, error } = useSignup();

  useEffect(() => {
    if (!thumbnail) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(thumbnail);
    setPreview(objectUrl);

    // free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 300000) {
      setThumbnailError('Image file size must be less than 300kb');
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);

    console.log('thumbnail updated');
  };

  return (
    <motion.form
      layout
      initial={{ scale: 0 ,opacity:0}}
      animate={{ scale: 1, opacity:1, transition: { duration: 0.5 } }}
      className='max-w-[360px] mx-auto my-[60px] p-10 border-[1px] text-black border-[#ddd] bg-bg-component drop-shadow-lg rounded-sm'
      onSubmit={handleSubmit}>
      <h2 className='font-extrabold text-2xl mb-4'>Sign Up</h2>
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
      <div className='mb-6'>
        <label htmlFor='displayName'>
          <span className='flex flex-col text-sm mb-1'>display name:</span>
          <input
            className='drop-shadow-sm py-1 px-1 w-full ring-[1px] ring-gray-200 active:scale-105 transition duration-100 outline-none'
            id='displayName'
            type='text'
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
      </div>
      <div className='mb-6'>
        <label htmlFor='file'>
          <span>profile thumbnail:</span>
          <input
            className='bg-white py-1 px-1 w-full ring-[1px] ring-gray-200'
            id='file'
            type='file'
            required
            accept='image/png, image/jpeg,image/webp,image/svg+xml'
            onChange={handleFileChange}
          />
          <motion.div
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            className='flex items-center justify-center w-full'>
            {preview && (
              <Image
                width={100}
                height={100}
                alt='image'
                src={preview}
                className='w-24 h-24 rounded-full object-cover p-2'
              />
            )}
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
          </motion.div>
        </label>
      </div>
      {!isPending && <button className='btn'>Sign up</button>}
      {isPending && (
        <button className='btn' disabled>
          Loading
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </motion.form>
  );
}
