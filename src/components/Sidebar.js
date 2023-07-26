'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineSpaceDashboard, MdAdd } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const currentRoute = usePathname();

  return (
    <motion.div
      className='hidden w-[300px] md:inline-block min-w-[300px] bg-primary-color min-h-screen box-border relative text-[#fff]'
      initial={{ x: '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout>
      <div className='fixed w-full max-w-[300px]'>
        <motion.div
          className='font-bold text-center tracking-[1px] py-10 px-[30px] border-b-[1px] w-full border-b-[rgba(255,255,255,0.2)]'
          initial={{ x: '-30%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          layout>
          {/* avatar and username  */}
          <p>Hey user</p>
        </motion.div>
        <motion.nav
          className='mt-20 ml-5'
          initial={{ x: '-30%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
          layout>
          <ul>
            <li className='mt-[10px]'>
              <Link
                className={`flex items-center p-[10px] w-full text-[#fff] box-border ${
                  currentRoute == '/' ? 'active-sidebar text-heading-color' : ''
                }`}
                href='/'>
                <MdOutlineSpaceDashboard size={17} className='mr-[10px]' />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className='mt-[10px]'>
              <Link
                className={`items-center flex p-[10px] w-full text-[#fff] box-border ${
                  currentRoute == '/create'
                    ? 'active-sidebar text-heading-color'
                    : ''
                }`}
                href='/create'>
                <MdAdd size={17} className='mr-[10px]' />
                <span>New Project</span>
              </Link>
            </li>
          </ul>
        </motion.nav>
      </div>
    </motion.div>
  );
}
