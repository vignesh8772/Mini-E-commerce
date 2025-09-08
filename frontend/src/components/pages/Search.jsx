import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SEARCH() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const searchIcon = () => {
      navigate("/search?keyword=" + encodeURIComponent(input));
  };

  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="form-control"
        placeholder="Enter Product Name ..."
        />
      <div className="input-group-append">
        <button id="search_btn" className="btn" onClick={searchIcon}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
