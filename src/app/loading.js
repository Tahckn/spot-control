export default function loading() {
  const skeletonProjects = Array.from({ length: 6 }).map((_, index) => ({
    id: index,
    name: 'Loading...',
    dueDate: { toDate: () => new Date() },
    assignedUsersList: Array.from({ length: 3 }),
  }));

  return (
    <div className="w-full">
      <div className='-mb-1 h-[20px] w-[150px] bg-[#262837] rounded-lg p-2 animate-pulse'></div>
      <div className='project-list'>
        {skeletonProjects.map((project) => (
          <div
            key={project.id}
            className='bg-bg-color rounded-2xl p-4 drop-shadow-lg'>
            <div className='w-full h-10 bg-[#40435d] rounded animate-pulse'></div>
            <div className='h-4 mt-2 bg-[#40435d] rounded animate-pulse'></div>
            <div className='mt-5 pt-[10px] border-t border-t-border-color animate-pulse'>
              <ul className='flex my-[10px] animate-pulse'>
                {project.assignedUsersList.map((_, index) => (
                  <li className='-mr-4' key={index}>
                    <div className='w-[40px] h-[40px] bg-[#40435d] p-2 rounded-full'></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
