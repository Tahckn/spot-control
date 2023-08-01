import Image from 'next/image';

export default function Avatar({ src }) {
  return (
    <div
      className='inline-block avatar overflow-hidden rounded-full'>
      <Image
        src={src}
        priority
        alt='user avatar'
        width={100}
        height={100}
        className='object-cover'
      />
    </div>
  );
}
