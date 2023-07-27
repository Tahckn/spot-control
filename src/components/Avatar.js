import Image from 'next/image';

export default function Avatar({ src }) {
  return (
    <div className='inline-block w-[50px] h-50px overflow-hidden'>
      <Image src={src} priority alt='user avatar' width={100} height={100} className='rounded-full object-cover' />
    </div>
  );
}
