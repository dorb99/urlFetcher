import React from "react";
import "./MetaDisplayer.css";

function MetaDisplayer({ metadata }) {

  // Making the grid responsive to the urls
  const columnClass = metadata.length % 3 === 0 ? "three-columns" : "two-columns";
  
    return (
    <>
      {metadata && metadata.length > 0 ? (
        <div className={`metadataContainer ${columnClass}`}>
            {metadata.map((data, index) => (
              <div key={index} className="metadataCard">
                <img src={data.image || "Couldn't find image"} alt={data.title} />
                <h3>{data.title}</h3>
                <p>{data.description}</p>
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
}

export default MetaDisplayer;
