'use client';

export default function ProjectFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  const filterList = [
    'all',
    'mine',
    'development',
    'design',
    'marketing',
    'sales',
  ];

  return (
    <div>
      <nav className='flex gap-x-2 mr-1 mt-3 lg:mt-0 text-[#6b6a70] font-semibold'>
        {filterList.map((filter) => (
          <button
            onClick={() => handleClick(filter)}
            className={`text-sm px-3 py-1 capitalize ${
              currentFilter === filter && 'filter-active'
            }`}
            key={filter}>
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
