import { useFirestore } from '@/hooks/useFirestore';
import Avatar from '../../components/Avatar';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';

export default function ProjectSummary({ project }) {
  const assignedUsersList = Array.from({ length: 3 });
  const { deleteDocument } = useFirestore('projects');
  const router = useRouter();
  const { user } = useAuthContext();

  const handleClick = () => {
    deleteDocument(project.id);
    router.push("/");
  };

  if (project && user) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className='bg-bg-color p-7 rounded-2xl'>
          <h2 className='font-semibold text-md leading-6'>{project.name}</h2>
          <p className='text-xs mb-3 text-[#a4a5ac]'>
            Created By {project.createdBy.displayName}
          </p>
          <p className='my-1 mx-0 text-xs text-[#b5b7ba]'>
            Project due by {project.dueDate.toDate().toDateString()}
          </p>
          <p className='my-[30px] mx-0 text-[#a4a5ac] leading-7 text-sm'>
            {project.details}
          </p>
          <h4 className='text-sm'>Project us assigned to:</h4>
          <div className='flex mt-5'>
            {project.assignedUsersList.map((user) => (
              <div className='summary -mr-4' key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            ))}
          </div>
        </div>
        {user.uid === project.createdBy.id && (
          <button onClick={handleClick} className='btn p-2 mt-3'>
            Mark as Complete
          </button>
        )}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='bg-[#262837] p-7 rounded-2xl animate-pulse'>
        <div className='bg-[#40435d] rounded-lg text-md leading-6 w-1/2 h-6 animate-pulse'></div>
        <div className='my-[10px] w-1/3 bg-[#40435d] rounded-lg h-4 mx-0 animate-pulse'></div>
        <div className='my-[30px] h-36 w-full mx-0 bg-[#40435d] rounded-lg leading-7 text-sm animate-pulse'></div>
        <div className='w-1/4 h-5 bg-[#40435d] rounded-lg animate-pulse'></div>
        <ul className='flex my-[10px] animate-pulse h-10'>
          {assignedUsersList.map((index) => (
            <li className='-mr-4' key={index}>
              <div className='w-[40px] h-[40px] bg-[#40435d] rounded-full'></div>
            </li>
          ))}
        </ul>
        <div className='h-[36px] mt-4 w-[143px] bg-[#40435d] rounded-lg p-2 animate-pulse'></div>
      </motion.div>
    );
  }
}
