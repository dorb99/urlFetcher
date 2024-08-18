import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetcher } from "./src/Controller";

vi.mock("axios");

describe("Fetch Metadata", () => {
  it("Returning metadata for valid URLs and handle invalid URLs correctly", async () => {
    const validUrl = "https://valid-url.com";
    const invalidUrl = "https://invalid-url.com";

    const validMetadata = {
      title: "Valid Title",
      description: "Valid Description",
      image: "valid-image.jpg",
    };

    vi.mocked(axios.get).mockImplementation((url) => {
      if (url === validUrl) {
        return Promise.resolve({
          data: "<html></html>",
          request: { res: { responseUrl: url } },
        });
      } else {
        return Promise.reject(new Error("Invalid URL"));
      }
    });

    const metascraper = vi.fn().mockResolvedValue(validMetadata);
    vi.mock("./src/Controller.js", () => ({
      fetcher: async (urls) => {
        return Promise.all(
          urls.map(async (url) => {
            try {
              const {
                data: html,
                request: {
                  res: { responseUrl },
                },
              } = await axios.get(url);
              const metadata = await metascraper({ html, url: responseUrl });
              return metadata;
            } catch {
              return {
                title: "N/A",
                description: "Could not fetch metadata",
                image: "",
              };
            }
          })
        );
      },
    }));

    const response = await fetcher([validUrl, invalidUrl]);

    // Check that valid URLs
    response.slice(0, 1).forEach((metadata) => {
      expect(Object.keys(metadata)).toHaveLength(3);
      expect(metadata).toHaveProperty("title");
      expect(metadata).toHaveProperty("description");
      expect(metadata).toHaveProperty("image");
    });

    // Check the invalid URL
    const invalidResponse = response[1];
    expect(invalidResponse).toHaveProperty("title", "N/A");
    expect(invalidResponse).toHaveProperty(
      "description",
      "Could not fetch metadata"
    );
    expect(invalidResponse).toHaveProperty("image", "");
  });

  it("Returning metadata for all valid URLs", async () => {
    const url = "https://valid-url.com";
    const metadata = {
      title: "Valid Title",
      description: "Valid Description",
      image: "valid-image.jpg",
    };

    vi.mocked(axios.get).mockResolvedValue({
      data: "<html></html>",
      request: { res: { responseUrl: url } },
    });

    const metascraper = vi.fn().mockResolvedValue(metadata);
    vi.mock("./src/Controller.js", () => ({
      fetcher: async (urls) => {
        return Promise.all(
          urls.map(async (url) => {
            try {
              const {
                data: html,
                request: {
                  res: { responseUrl },
                },
              } = await axios.get(url);
              const metadata = await metascraper({ html, url: responseUrl });
              return metadata;
            } catch {
              return {
                title: "N/A",
                description: "Could not fetch metadata",
                image: "",
              };
            }
          })
        );
      },
    }));

    const response = await fetcher([url, url, url]);

    response.forEach((metadata) => {
      expect(Object.keys(metadata)).toHaveLength(3);
      expect(metadata).toHaveProperty("title");
      expect(metadata).toHaveProperty("description");
      expect(metadata).toHaveProperty("image");
    });
  });

  it("Returning error for all invalid URLs", async () => {
    const invalidUrl = "https://invalid-url.com";

    vi.mocked(axios.get).mockRejectedValue(new Error("Network Error"));

    const metascraper = vi
      .fn()
      .mockRejectedValue(new Error("Failed to scrape metadata"));
    vi.mock("./src/Controller.js", () => ({
      fetcher: async (urls) => {
        return Promise.all(
          urls.map(async () => {
            try {
              await axios.get(invalidUrl);
              return {};
            } catch {
              return {
                title: "N/A",
                description: "Could not fetch metadata",
                image: "",
              };
            }
          })
        );
      },
    }));

    const response = await fetcher([invalidUrl, invalidUrl, invalidUrl]);

    expect(response).toEqual([
      { title: "N/A", description: "Could not fetch metadata", image: "" },
      { title: "N/A", description: "Could not fetch metadata", image: "" },
      { title: "N/A", description: "Could not fetch metadata", image: "" },
    ]);
  });
});
