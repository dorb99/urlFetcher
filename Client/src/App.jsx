import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import FormContainer from "./components/form/FormContainer";
import MetaDisplayer from "./components/metadisplayer/MetaDisplayer";
import Loader from "./components/loader/Loader";

const App = () => {
  const [metadata, setMetadata] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async (urls) => {
    setError("");
    setMetadata([]);
    setLoading(true);
    try {
      const serverUrl =
      // Using the local server if the client is locally too.
        window.location.hostname === "localhost"
          ? "http://localhost:3000/fetch-metadata"
          : "https://urlfetcherserver-93d9382076d0.herokuapp.com/fetch-metadata";

      const response = await axios.post(serverUrl, { urls });
      setMetadata(response.data);
    } catch (err) {
      setError("Failed to fetch metadata. Please check the URLs and try again");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>URL Fetcher</h1>
      <FormContainer submitUrls={fetchMetadata} />
      {error && (
        <div title="errorMessage" className="error-message">
          {error}
        </div>
      )}
      {loading ? <Loader /> : <MetaDisplayer metadata={metadata} />}
    </div>
  );
};

export { App };
