'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineSpaceDashboard, MdAdd } from 'react-icons/md';

export default function Sidebar() {
  const currentRoute = usePathname();

  return (
    <div className='hidden w-[300px] md:inline-block min-w-[300px] bg-primary-color min-h-screen box-border relative text-[#fff]'>
      <div className='fixed w-full max-w-[300px]'>
        <div className='font-bold text-center tracking-[1px] py-10 px-[30px] border-b-[1px] w-full border-b-[rgba(255,255,255,0.2)]'>
          {/* avatar and username  */}
          <p>Hey user</p>
        </div>
        <nav className='mt-20 ml-5'>
          <ul>
            <li className='mt-[10px]'>
              <Link 
                className={`flex items-center p-[10px] w-full text-[#fff] box-border ${currentRoute == '/' ? 'active-sidebar text-heading-color' : ''}`}
                href='/'>
                <MdOutlineSpaceDashboard size={17} className='mr-[10px]' />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className='mt-[10px]'>
              <Link
                className={`items-center flex p-[10px] w-full text-[#fff] box-border ${currentRoute == '/create' ? 'active-sidebar text-heading-color' : ''}`}
                href='/create'>
                <MdAdd size={17} className='mr-[10px]'/>
                <span>New Project</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
