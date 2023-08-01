'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { customStyles } from '@/selectStyles';
import { useCollection } from '@/hooks/useCollection';
import { motion } from 'framer-motion';
import makeAnimated from 'react-select/animated';
import { timestamp } from '@/firebase/config';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useFirestore } from '@/hooks/useFirestore';
import { useRouter } from 'next/navigation';

//select categories
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function page() {
  const { addDocument, response } = useFirestore('projects');
  const { documents } = useCollection('users');
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const router = useRouter();

  //form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);
    if (!category) {
      setFormError('Please select project category');
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign at least 1 user for project');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      router.push('/');
    }
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const animatedComponents = makeAnimated();

  return (
    <div>
      <h2 className='text-xl font-semibold'>Create a new Project</h2>
    <motion.div
      className='max-w-[600px] pb-3'
      layout
      initial={{  opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            className='inp'
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            className='inp'
            type='text'
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <div className='date-container'>
            <input
              className='inp'
              type='date'
              required
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </div>
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
            styles={customStyles}
            placeholder={''}
            menuPosition='fixed'
            className='select'
            menuPlacement='auto'
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            styles={customStyles}
            placeholder={''}
            className='select'
            onChange={(option) => setAssignedUsers(option)}
            isMulti
            components={animatedComponents}
            menuPosition='fixed'
            menuPlacement='auto'
          />
        </label>
        {!response.isPending && <button className='btn'>Add Project</button>}
      {response.isPending && (
        <button className='btn' disabled>
          <svg
            aria-hidden='true'
            role='status'
            class='inline w-4 h-4 mr-3 text-white animate-spin'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='#242529'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='#fdf17e'
            />
          </svg>
          Adding...
        </button>
      )}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </motion.div>
    </div>
  );
}
