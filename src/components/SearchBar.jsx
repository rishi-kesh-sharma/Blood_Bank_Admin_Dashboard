import { useRef } from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
}) => {
  const searchInputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchQuery(searchInputRef.current.value);
    setCurrentPage(1);
  };
  return (
    <form className="content" onSubmit={handleSubmit}>
      <label htmlFor="search"></label>
      <input
        //   value={searchQuery}
        //   onInput={(e) => setSearchQuery(e.target.value)}
        ref={searchInputRef}
        type="text"
        id="search"
        placeholder="Search..."
        name="search"
        className=" outline-none w-[300px] text-black py-[0.2rem] focus:border-none pl-[1rem] "
      />
      <button
        type="submit"
        className="bg-red-500 text-gray-300 text-[1rem] py-[0.2rem] px-[0.5rem]"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
