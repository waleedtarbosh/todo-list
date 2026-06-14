export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label
          htmlFor="sortBy"
          className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase"
        >
          Sort
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="bg-surface-container border border-outline-variant/50 text-on-surface text-[14px] rounded-md px-3 py-1.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors cursor-pointer"
        >
          <option value="creationDate">Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="sortDirection"
          className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase"
        >
          Order
        </label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
          className="bg-surface-container border border-outline-variant/50 text-on-surface text-[14px] rounded-md px-3 py-1.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors cursor-pointer"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>
  );
}
