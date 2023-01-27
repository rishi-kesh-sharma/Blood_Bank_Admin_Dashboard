import { useRef } from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
}) => {
  const searchInputRef = useRef();
  const handleChange = (e) => {
    setSearchQuery(searchInputRef.current.value);
    setCurrentPage(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchQuery(searchInputRef.current.value);
    setCurrentPage(0);
  };
  return (
    <form className="content" onSubmit={handleSubmit} onChange={handleChange}>
      <label htmlFor="search"></label>
      <input
        //   value={searchQuery}
        //   onInput={(e) => setSearchQuery(e.target.value)}
        ref={searchInputRef}
        type="text"
        id="search"
        placeholder="Search..."
        name="search"
        className="  border-gray-200 border-[1px] w-[280px] text-black py-[0.4rem] focus:border-none pl-[1rem] text-[1rem]"
      />
      <button
        type="submit"
        className="bg-red-500 text-gray-300 text-[1rem] py-[0.43em] px-[0.5rem]"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
