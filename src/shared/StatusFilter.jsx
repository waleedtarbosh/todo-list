import { useSearchParams } from 'react-router';

export default function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status) => {
    if (status === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  };

  const statuses = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Done' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">
        Show
      </span>
      <div className="flex rounded-md overflow-hidden border border-outline-variant/50">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => handleStatusChange(s.value)}
            className={`px-3 py-1.5 text-[14px] tracking-[0.05em] font-semibold uppercase transition-all duration-200 ${
              currentStatus === s.value
                ? 'bg-primary/20 text-primary border-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-primary/10'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}