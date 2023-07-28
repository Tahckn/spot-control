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
        className='z-20 w-[300px] min-w-[300px] bg-bg-color  min-h-screen box-border relative text-[#fff]'
        initial={{ x: '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: '-50%' }}
        layout>
        <div className='fixed w-full max-w-[300px]'>
          <motion.div
            className='font-semibold text-center tracking-[1px] py-10 px-[30px] border-b-[1px] w-full border-b-border-color'
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            layout>
            <Avatar src={user.photoURL} />
            <p>{user.displayName}</p>
            <p className='text-xs mt-1 font-light text-[#7c7b80]'>
              {user.email}
            </p>
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
                    initial={{ scaleX: 0, originX: 1 }}
                    animate={{
                      scaleX: 1,
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
                  className='flex items-center py-[16px] px-[15px] w-full text-text-color box-border rounded-l-2xl'
                  href='/'>
                  <MdOutlineSpaceDashboard
                    size={20}
                    className={`mr-[10px] z-10 ${
                      currentRoute == '/' && 'text-primary-color'
                    }`}
                  />
                  <span
                    className={`mr-[10px] z-10 ${
                      currentRoute == '/' && 'text-primary-color'
                    }`}>
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className='mt-[10px] relative'>
                {currentRoute == '/create' && (
                  <motion.span
                    initial={{ scaleX: 0, originX: 1 }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      type: 'spring',
                      damping: '15',
                      stiffness: 75,
                    }}
                    className='z-0 w-full absolute bg-sidebar-item  h-full rounded-xl'></motion.span>
                )}
                <Link
                  className='flex items-center py-[16px] px-[15px] w-full text-text-color box-border rounded-l-2xl'
                  href='/create'>
                  <MdAdd
                    className={`mr-[10px] z-10 ${
                      currentRoute == '/create' && 'text-primary-color'
                    }`}
                    size={20}
                  />
                  <span
                    className={`mr-[10px] z-10 ${
                      currentRoute == '/create' && 'text-primary-color'
                    }`}>
                    New Project
                  </span>
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
