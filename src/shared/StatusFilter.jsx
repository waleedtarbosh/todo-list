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

  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor='statusFilter' style={{ marginRight: '10px', fontWeight: 'bold' }}>Show:</label>
      <select
        id='statusFilter'
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        style={{ padding: '5px', borderRadius: '4px' }}
      >
        <option value='all'>All Todos</option>
        <option value='active'>Active Todos</option>
        <option value='completed'>Completed Todos</option>
      </select>
    </div>
  );
}