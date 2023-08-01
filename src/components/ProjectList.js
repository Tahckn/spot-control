import Link from 'next/link';
import Avatar from './Avatar';
import { PiChatCircleDots, PiUsersThree } from 'react-icons/pi';
import { motion } from 'framer-motion';
export default function ProjectList({ projects }) {
  return (
    <div className='project-list py-2'>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project, i) => (
        <motion.span
          className='active:translate-x-0 active:translate-y-0 transition duration-100 hover:-translate-x-2 hover:-translate-y-2 bg-bg-color rounded-2xl p-4 drop-shadow-lg'
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: i * 0.2 }}>
          <Link href={`/project/${project.id}`}>
            <h4 className='font-semibold text-md leading-6'>{project.name}</h4>
            <p className='text-[13px] text-[#b5b7ba]'>
              Due by {project.dueDate.toDate().toDateString()}
            </p>
            <div className='mt-5 flex pt-[10px] border-t border-t-border-color'>
              <ul className='flex my-[5px] -mb-1'>
                {project.assignedUsersList.slice(0, 4).map((user) => (
                  <li className='-mr-4' key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
              <div className='ml-auto justify-center items-center flex text-[#909199] font-semibold gap-x-6'>
                <div className='flex gap-x-1 items-end'>
                  <PiChatCircleDots size={17} className='stroke-[#909199] stroke-2'/>
                  <span className='text-xs '>{project.comments.length}</span>
                </div>
                <div className='flex gap-x-1 items-end'>
                  <PiUsersThree size={18}/>
                  <span className='text-xs'>
                    {project.assignedUsersList.length}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.span>
      ))}
    </div>
  );
}
