import { useState, useEffect, useRef } from 'react';
import searchIcon from "./assets/search-icon.png";

export default function SearchBar({ onSearch }) {
  const searchBarRef = useRef(null);
  const [searchBarStyle, setSearchBarStyle] = useState({ outline: "none" });
  const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("Search note...");
  const [searchQuery, setSearchQuery] = useState("");

  function handleClickInside() {
    if (searchBarRef.current) {
      setSearchBarStyle({
        outline: "var(--input-outline-color) 2px solid"
      });
      setSearchBarPlaceholder("");

      const input = searchBarRef.current.querySelector("input");
      input.focus();
    }
  }

  function handleClickOutside(event) {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchBarStyle({ outline: "none" });
      setSearchBarPlaceholder("Search note...");
    }
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={searchBarRef} style={searchBarStyle} onClick={handleClickInside}>
      <input
        type="text"
        id="search-input"
        placeholder={searchBarPlaceholder}
        value={searchQuery}
        onChange={handleSearch}
      />
      <img src={searchIcon} alt="" width="21" height="21" />
    </div>
  );
}
