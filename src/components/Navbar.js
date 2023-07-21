'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const currentRoute = usePathname();

  return (
    <div className='text-[15px] text-gray-600 font-semibold w-full py-30 box-border mb-20'>
      <div className='flex mx-auto justify-end items-center'>
        <Link href='/' className='mr-auto'>
          <div className='-ml-10 mt-2'>
            <Image src='/assets/logo1.png' width={250} height={90} />
          </div>
        </Link>
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
          <button className='btn text-gray-600'>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
