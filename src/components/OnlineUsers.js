'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useCollection } from '@/hooks/useCollection';
import Avatar from './Avatar';
import { motion } from 'framer-motion';
import { hasCookie } from 'cookies-next';


export default function OnlineUsers() {
  const { error, documents } = useCollection('users');
  const { user, authIsReady } = useAuthContext();
  const hasUser = hasCookie('logged')

  const container = {
    hidden: { opacity: 0, x:'50%' },
    show: {
      x:0,
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        duration:0.5
      }
    }
  };
  
  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };


  if (user && authIsReady && hasUser) {
    return (
      <motion.div
        className='border-l-[1px] border-l-border-color z-20 w-[250px] h-[100vh] min-w-[250px] py-[30px] box-border bg-bg-color text-heading-color'
        variants={container}
        animate='show'
        initial='hidden'
        >
        <h2 className='text-right mb-10 pb-[10px] border-b-[1px] px-[30px] text-text-color border-b-border-color text-lg'>
          All Users
        </h2>
        {error && <div className='error'>{error}</div>}
        <div className='px-[30px]'>
          {documents &&
            documents.map((user) => (
              <motion.div
                key={user.id}
                className='flex justify-end items-center text-text-color my-5 mx-auto'
                variants={listItem}
                >
                <span className='mr-2'>{user.displayName}</span>
                <Avatar src={user.photoURL} className='ml-[10px] w-10 h-10' />
              </motion.div>
            ))}
        </div>
      </motion.div>
    );
  } else {
    <></>;
  }
}
