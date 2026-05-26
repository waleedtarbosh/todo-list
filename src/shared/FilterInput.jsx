export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="filterInput" style={{ marginRight: '10px' }}>
        Search todos:
      </label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
        style={{ padding: '5px', width: '200px' }}
      />
    </div>
  );
}
