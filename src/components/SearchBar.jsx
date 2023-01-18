import { useRef } from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const searchInputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchQuery(searchInputRef.current.value);
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
        className=" outline-none text-black  py-[0.25rem] focus:border-none px-[1rem] lg:w-[16rem] xl:text-[1.18rem] 2xl:w-[24rem] 2xl:h-[3rem] 2xl:text-2xl"
      />
      <button
        type="submit"
        className="bg-red-500 text-gray-300 px-[0.57rem] py-[0.3rem] 2xl:text-2xl">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
