'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useCollection } from '@/hooks/useCollection';
import Avatar from './Avatar';
import { motion } from 'framer-motion';
import { hasCookie } from 'cookies-next';

export default function OnlineUsers() {
  const { error, documents } = useCollection('users');
  const { user, authIsReady } = useAuthContext();
  const hasUser = hasCookie('logged');

  const container = {
    hidden: { opacity: 0, x: '50%' },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.5,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  if (user && authIsReady && hasUser) {
    return (
      <motion.div
        className='hidden md:inline-block z-20 w-[250px] min-h-screen min-w-[250px] py-[30px] box-border bg-bg-color text-heading-color'
        variants={container}
        animate='show'
        initial='hidden'>
        <h2 className='text-right mb-10 pb-[10px] border-b-[1px] px-[30px] text-text-color border-b-border-color text-lg'>
          All Users
        </h2>
        {error && <div className='error'>{error}</div>}
        <div className='px-[30px]'>
          {documents &&
            documents.map((user) => (
              <motion.div
                key={user.id}
                className='flex justify-end text-sm items-center text-text-color my-3.5'
                variants={listItem}>
                <span className='mr-2'>{user.displayName}</span>
                <div className='relative online'>
                  <Avatar className='avatar' src={user.photoURL}/>
                  <span
                    className={`absolute -top-1 right-0 rounded-full w-4 h-4 ${
                      user.online ? 'bg-[#62d86a] animate-pulse' : 'bg-gray-700'
                    } `}></span>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    );
  } else {
    <></>;
  }
}
