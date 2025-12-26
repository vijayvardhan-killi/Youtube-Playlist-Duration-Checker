import React from "react";

const SearchAndSort = ({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  searchText,
  setSearchText,
}) => {

  return (
    <div className="flex flex-col gap-2 items-center justify-center sm:w-[40%] mx-auto my-8 px-2 bg-slate-100 rounded p-6">
      <input
        type="text"
        placeholder="Search..."
        className="sm:text-2xl px-3 py-2 border border-1 border-gray-800 rounded-md h-fit w-full"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex items-center w-full px-2">
        <label
          htmlFor="field"
          className="sm:w-[50%] w-[60%] sm:text-lg text-sm text"
        >
          Sort based on{" "}
        </label>
        <select
          name="field"
          className="w-full px-6 py-3 border border-1 border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-slate-400 appearance-none cursor-pointer"
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="duration">Duration</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="flex items-center w-full px-2">
        <label
          htmlFor="field"
          className="sm:w-[50%] w-[60%] sm:text-lg text-sm "
        >
          Order{" "}
        </label>
        <select
          name="order"
          className="w-full px-6 py-2 border border-1 border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-slate-400 appearance-none cursor-pointer"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="des">Descending</option>
        </select>
      </div>
      {/* <h1>{sortField+""+sortOrder+""+searchText}</h1> */}
    </div>
  );
};

export default SearchAndSort;
