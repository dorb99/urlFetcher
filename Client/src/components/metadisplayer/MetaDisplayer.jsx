import React from "react";
import "./MetaDisplayer.css";

function MetaDisplayer({ metadata }) {
  
  const columnClass = metadata.length % 3 === 0 ? "three-columns" : "two-columns";
  
    return (
    <>
      {metadata && metadata.length > 0 ? (
        <div className={`metadataContainer ${columnClass}`}>
            {metadata.map((data, index) => (
              <div key={index} className="metadataCard">
                <img src={data.image || "Couldn't find image"} alt={data.title || "No image"} />
                <h3>{data.title || "No title"}</h3>
                <p>{data.description || "No description"}</p>
              </div>
            ))}
        </div>
      ) : <p>Please insert website urls</p>}
    </>
  );
}

export default MetaDisplayer;
