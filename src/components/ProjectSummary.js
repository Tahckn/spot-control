import Avatar from './Avatar';
import { motion } from 'framer-motion';

export default function ProjectSummary({ project }) {
  if (project) {
    return (
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      >
        <div className='bg-bg-color p-7 rounded-md'>
          <h2 className='font-semibold text-md leading-6'>{project.name}</h2>
          <p className='my-[10px] mx-0 text-xs text-[#b5b7ba]'>
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
      </motion.div>
    );
  }
}
