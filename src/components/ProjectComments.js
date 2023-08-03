'use client';
import { useState } from 'react';
import { timestamp } from '@/firebase/config';
import { useAuthContext } from '@/hooks/useAuthContext';
import { motion } from 'framer-motion';
import { useFirestore } from '@/hooks/useFirestore';
import LoadingButton from './LoadingButton';
import Avatar from './Avatar';

export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore('projects');
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment('');
    }
  };

  //for loading screen
  const fakeArray = Array.from({ length: 3 });

  if (project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}>
        <h4 className=''>Project Comments</h4>

        <ul className='comments'>
          {project.comments.length > 0 &&
            project.comments.map((comment) => (
              <li
                key={comment.id}
                className='p-4 rounded-3xl mt-5 bg-bg-color drop-shadow-lg'>
                <div className='flex items-center gap-2'>
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className='text-sm text-[#888d91] mt-1 mb-2'>
                  <p>date here</p>
                </div>
                <div className='text-sm'>
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Add new comment:</span>
            <textarea
              className='min-h-[40px] rounded-xl'
              required
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}></textarea>
          </label>
          {!response.isPending && <button className='btn'>Add Comment</button>}
          {response.isPending && <LoadingButton text='Adding...' />}
        </form>
      </motion.div>
    );
  } else {
    return (
      <div className='comments'>
        {fakeArray.map((index) => (
          <div
            key={index}
            className='p-4 rounded-3xl mt-5 animate-pulse border-border-color border-[1px] bg-[#262837] drop-shadow-lg'>
            <div className='flex items-center gap-2 rounded-3xl'>
              <div className='w-[30px] h-[30px] rounded-full bg-[#40435d]' />
              <p className='w-[70px] h-6 bg-[#40435d] rounded-3xl'></p>
            </div>
            <div className='h-5 w-10 bg-[#40435d] mt-1 mb-2 rounded-3xl'></div>
            <div className='bg-[#40435d] w-full h-6 rounded-3xl'></div>
          </div>
        ))}
        <div className='mt-4'>
            <div className='w-[160px] h-5 bg-[#40435d] rounded-xl animate-pulse'></div>
            <div className='min-h-[60px] mt-2 w-full rounded-xl bg-[#40435d] animate-pulse'></div>
            <div className='h-[36px] mt-4 w-[143px] bg-[#40435d] rounded-lg p-2 animate-pulse'></div>
        </div>
      </div>
    );
  }
}
