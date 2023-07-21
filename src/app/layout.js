import { AuthContextProvider } from '@/context/AuthContext';
import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Spot Control',
  description:
    'Simplify project management with Spot Control - the comprehensive platform for efficient collaboration, task tracking, and success.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <AuthContextProvider>
        <main className={`${poppins.className} flex`}>
          <Sidebar />
          <div className='grow py-0 px-[60px]'>
            <Navbar />
            {children}
          </div>
        </main>
      </AuthContextProvider>
    </html>
  );
}
