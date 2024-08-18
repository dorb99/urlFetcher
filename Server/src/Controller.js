import axios from "axios";
import _metascraper from "metascraper";
import title from "metascraper-title";
import image from "metascraper-image";
import description from "metascraper-description";

const metascraper = _metascraper([title(), image(), description()]);

export async function fetcher(urls) {
  const results = [];
  // Fetch metadata for each URL
  for (const url of urls) {
    try {
      const {
        data: html,
        request: {
          res: { responseUrl },
        },
      } = await axios.get(url);
      const metadata = await metascraper({ html, url: responseUrl });
      results.push(metadata);
    } catch (error) {
      results.push({
        title: "N/A",
        description: "Could not fetch metadata",
        image: "",
      });
    }
  }
  return results;
}
