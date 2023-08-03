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
import LoadingButton from '@/components/LoadingButton';

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
        {!response.isPending && <button className='btn'>Create Project</button>}
      {response.isPending && (
        <LoadingButton text='Creating...'/>
      )}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </motion.div>
    </div>
  );
}
