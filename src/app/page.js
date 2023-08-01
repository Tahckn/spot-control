'use client';
import ProjectList from '@/components/ProjectList';
import { useCollection } from '@/hooks/useCollection';

export default function Home() {
  const { documents, error } = useCollection('projects');

  return (
    <main className=''>
      <h2 className='text-xl font-semibold'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </main>
  );
}
