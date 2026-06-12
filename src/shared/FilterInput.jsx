export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className="flex-1 glass-panel rounded-md p-1 flex items-center px-4 neon-border-focus transition-all duration-300">
      <span className="material-symbols-outlined text-outline-variant mr-3" style={{ fontSize: '24px' }}>
        search
      </span>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search rituals..."
        className="w-full bg-transparent border-none text-on-surface focus:ring-0 focus:outline-none placeholder-outline-variant font-body text-[16px] leading-[24px] py-3"
      />
    </div>
  );
}
