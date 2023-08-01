export default function loading() {
  const assignedUsersList = Array.from({ length: 3 });
  return (
    <div className='project-details'>
      <div className='bg-[#262837] p-7 rounded-md animate-pulse'>
        <div className='font-semibold bg-[#40435d] text-md leading-6 w-1/2 h-6 animate-pulse'></div>
        <div className='my-[10px] w-1/3 bg-[#40435d] h-4 mx-0 animate-pulse'></div>
        <div className='my-[30px] h-36 w-full mx-0 bg-[#40435d] leading-7 text-sm animate-pulse'></div>
        <div className='w-1/4 h-5 bg-[#40435d] animate-pulse'></div>
        <ul className='flex my-[10px] animate-pulse h-10'>
          {assignedUsersList.map((index) => (
            <li className='-mr-4' key={index}>
              <div className='w-[40px] h-[40px] bg-[#40435d] rounded-full'></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
