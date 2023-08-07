'use client';
import ProjectFilter from '@/components/ProjectFilter';
import ProjectList from '@/components/ProjectList';
import { useCollection } from '@/hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function Home() {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents?.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'mine':
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
        case "development":
        case 'design':
        case 'sales':
        case 'marketing':
          console.log(document.category,currentFilter)
          return document.category === currentFilter;
          default:
            return true
    }
  })

  return (
    <main>
      <div className='lg:flex justify-between items-center'>
        <h2 className='text-xl font-semibold mr-2'>Dashboard</h2>
        {documents && (
          <ProjectFilter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
        )}
      </div>
      {error && <p className='error'>{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </main>
  );
}
