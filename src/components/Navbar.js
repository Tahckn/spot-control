'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/hooks/useLogout';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/hooks/useAuthContext';
import LoadingButton from './LoadingButton';

export default function Navbar() {
  const currentRoute = usePathname();
  const { logout, isPending } = useLogout();
  const { user, authIsReady } = useAuthContext();

  return (
    <motion.div
      className='z-10 text-[15px] text-text-color font-semibold w-full py-[27px] box-border mb-20'
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      layout>
      <div className='flex mx-auto justify-end items-center mt-4'>
        <Link href='/' className='mr-auto items-center'>
          <div>
            <h1 className='text-2xl font-semibold uppercase text-primary-color'>Spot<span className='text-sm text-text-color'>Control</span> </h1>
          </div>
        </Link>
        <div className='flex space-x-3  md:space-x-4 items-center'>
          {!user && authIsReady && (
            <div className='flex space-x-3  md:space-x-4 items-center'>
              <Link
                className={currentRoute == '/login' ? 'active-nav' : ''}
                href='/login'>
                Login
              </Link>
              <Link
                className={currentRoute == '/signup' ? 'active-nav' : ''}
                href='/signup'>
                Signup
              </Link>
            </div>
          )}
          {user && (
            <div>
              {!isPending && authIsReady && (
                <button onClick={logout} className='btn text-text-color'>
                  Logout
                </button>
              )}
              {isPending && (
                <LoadingButton text=''/>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
