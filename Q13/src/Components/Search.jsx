import React, { useState } from "react";

const Search = ({ setCity }) => {
  const [input, setInput] = useState();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if(e.key == "Enter") {
      setCity(input) ; 
    }
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-10 ">
      <input
        type="text"
        placeholder="Enter the name of the city"
        value={input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className="px-4 py-2 border-2 w-[20rem] border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 "
      />

      <button
        className="px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => setCity(input)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
