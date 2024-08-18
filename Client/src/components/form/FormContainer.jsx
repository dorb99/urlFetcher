import React, { useState } from "react";
import "./FormContainer.css";

function FormContainer({ submitUrls }) {
  const [urls, setUrls] = useState(["", "", ""]);

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const updateUrlList = (action) => {
    const newUrls = [...urls];
    if (action === "add") {
      newUrls.push("");
    } else if (urls.length > 3) {
      newUrls.pop();
    }
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitUrls(urls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formContainer">
        {urls.map((url, index) => (
          <input
            className="urlInput"
            key={index}
            type="text"
            value={url}
            placeholder={`Enter URL ${index + 1}`}
            onChange={(e) => updateUrl(index, e.target.value)}
            required
          />
        ))}
        <div className="btns">
          <button
            className="btn"
            type="button"
            onClick={() => updateUrlList("add")}
          >
            Add Url
          </button>
          <button className="btn" type="button" onClick={updateUrlList}>
            Remove Url
          </button>
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormContainer;
