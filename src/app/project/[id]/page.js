'use client';
import { useDocument } from '@/hooks/useDocument';
import ProjectSummary from '@/components/ProjectSummary';
import ProjectComments from '@/components/ProjectComments';

export default function page({ params }) {
  const id = params.id;
  const { error, document } = useDocument('projects', id);

  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
}
