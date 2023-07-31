'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { customStyles } from '@/selectStyles';
import { useCollection } from '@/hooks/useCollection';
import { motion } from 'framer-motion';
import makeAnimated from 'react-select/animated';

//select categories
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function page() {
  //form field values

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate, category.value, assignedUsers);
  };

  const { documents } = useCollection('users');

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
    <motion.div
      className='max-w-[600px]'
      layout
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}>
      <h2 className='text-3xl font-semibold'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>
          <span>Project name:</span>
          <input
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor=''>
          <span>Project details:</span>
          <textarea
            type='text'
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label htmlFor=''>
          <span>Set due date:</span>
          <div className='date-container'>
            <input
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
            isClearable
            menuPosition="fixed"
            menuPlacement="auto"
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            styles={customStyles}
            placeholder={''}
            isClearable
            onChange={(option) => setAssignedUsers(option)}
            isMulti
            components={animatedComponents}
            menuPosition="fixed"
            menuPlacement="auto"
          />
        </label>
        <button className='btn'>Add Project</button>
      </form>
    </motion.div>
  );
}
