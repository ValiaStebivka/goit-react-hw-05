export const SearchBox = ({ value, onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(e.target.elements.query.value);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        value={value}
        onChange={e => onSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
