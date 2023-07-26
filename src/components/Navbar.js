'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/hooks/useLogout';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function Navbar() {
  const currentRoute = usePathname();
  const { logout, isPending } = useLogout();
  const { user,authIsReady } = useAuthContext();

  return (
    <motion.div
      className='text-[15px] text-gray-600 font-semibold w-full py-30 box-border mb-20'
      initial={{ y: '-30%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout>
      <div className='flex mx-auto justify-end items-center'>
        <Link href='/' className='mr-auto'>
          <div className='-ml-10 mt-2'>
            <Image
              src='/assets/logo1.png'
              width={250}
              height={90}
              className='w-auto'
              priority
              alt='logo'
            />
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
                <button onClick={logout} className='btn text-gray-600'>
                  Logout
                </button>
              )}
              {isPending && (
                <button disabled className='btn text-gray-600'>
                  Logging out...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
