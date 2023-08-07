'use client';
import { useDocument } from '@/hooks/useDocument';
import ProjectSummary from '@/app/project/ProjectSummary';
import ProjectComments from '@/app/project/ProjectComments';

export default function page({ params }) {
  const id = params.id;
  const { error, document } = useDocument('projects', id);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div className='project-details'>
      <ProjectSummary className='col-span-2' project={document} />
      <ProjectComments className='col-span-1' project={document} />
    </div>
  );
}
