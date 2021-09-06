export const Search = ({ action }) => {
  return (
    <div className="d-flex p-2 my-2 w-50 justify-content-center align-items-center">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        name="search"
        onChange={action}
      />
    </div>
  );
};
