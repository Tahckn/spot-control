'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineSpaceDashboard, MdAdd } from 'react-icons/md';
import { motion } from 'framer-motion';
import Avatar from './Avatar';
import { useAuthContext } from '@/hooks/useAuthContext';
import { hasCookie } from 'cookies-next';

export default function Sidebar() {
  const currentRoute = usePathname();
  const { user, authIsReady } = useAuthContext();
  const hasUser = hasCookie('logged');
  if (user && authIsReady && hasUser) {
    return (
      <motion.div
        className='z-20 hidden w-[300px] md:inline-block min-w-[300px] bg-bg-color border-r-[1px] border-r-border-color min-h-screen box-border relative text-[#fff]'
        initial={{ x: '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: '-50%' }}
        layout>
        <div className='fixed w-full max-w-[300px]'>
          <motion.div
            className='font-bold text-center tracking-[1px] py-10 px-[30px] border-b-[1px] w-full border-b-border-color'
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            layout>
            <Avatar src={user.photoURL} />
            <p>Hey {user.displayName}</p>
          </motion.div>
          <motion.nav
            className='mt-20 mx-5'
            initial={{ x: '-30%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7 }}
            layout>
            <ul>
              <li className='mt-[10px] relative'>
                {currentRoute == '/' && (
                  <motion.span
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{
                      scaleY: 1,
                      originY: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      type: 'spring',
                      damping: '15',
                      stiffness: 75,
                    }}
                    className='z-0 w-full absolute bg-bg-component  h-full rounded-xl'></motion.span>
                )}
                <Link
                  className='flex items-center py-[10px] px-[15px] w-full text-text-color box-border rounded-l-2xl'
                  href='/'>
                  <MdOutlineSpaceDashboard
                    size={20}
                    className='mr-[10px] z-10'
                  />
                  <span
                    className='mr-[10px] p-1 z-10'>
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className='mt-[10px] relative'>
                {currentRoute == '/create' && (
                  <motion.span
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={{
                      scaleY: 1,
                      originY: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      type: 'spring',
                      damping: '15',
                      stiffness: 75,
                    }}
                    className='z-0 w-full absolute bg-bg-component  h-full rounded-xl'></motion.span>
                )}
                <Link
                  className='flex items-center py-[10px] px-[15px] w-full text-text-color box-border rounded-l-2xl'
                  href='/create'>
                  <MdAdd className='mr-[10px] z-10' size={20} />
                  <span className='mr-[10px] z-10 p-1'>New Project</span>
                </Link>
              </li>
            </ul>
          </motion.nav>
        </div>
      </motion.div>
    );
  } else {
    <></>;
  }
}
