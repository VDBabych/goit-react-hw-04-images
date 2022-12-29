export const Searchbar = ({ submitAction }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    submitAction(new FormData(e.target).get('query').trim());
    e.target.reset();
  };
  return (
    <header className="Searchbar">
      <form onSubmit={onFormSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          🔍
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="query"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
