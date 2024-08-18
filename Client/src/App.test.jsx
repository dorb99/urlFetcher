import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { App } from "./App";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("App Component", () => {
  it("Displays an error message when server request fails", async () => {
    // Mock axios to reject the request
    axios.post.mockRejectedValue(new Error("Network Error"));

    // Render the component
    render(<App />);

    // Simulate form submission
    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    fireEvent.change(urlInputs[0], { target: { value: "http://example.com" } });
    fireEvent.change(urlInputs[1], { target: { value: "http://example.org" } });
    fireEvent.change(urlInputs[2], { target: { value: "http://example.net" } });
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    const errorMessage = await waitFor(() =>
      screen.getByText(
        /Failed to fetch metadata. Please check the URLs and try again/i
      )
    );

    // Assertions
    expect(errorMessage).toBeInTheDocument();
  });

  it("Return corrected metadata", async () => {
    // Mock axios to resolve with a specific response
    const mockMetadata = [
      {
        title: "Example Title 1",
        description: "Example Description 1",
        image: "http://example.com/image1.jpg",
      },
      {
        title: "Example Title 2",
        description: "Example Description 2",
        image: "http://example.com/image2.jpg",
      },
      {
        title: "Example Title 3",
        description: "Example Description 3",
        image: "http://example.com/image3.jpg",
      },
    ];
    axios.post.mockResolvedValue({ data: mockMetadata });

    // Render the component
    render(<App />);

    // Simulate form submission
    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    fireEvent.change(urlInputs[0], { target: { value: "http://example.com" } });
    fireEvent.change(urlInputs[1], { target: { value: "http://example.org" } });
    fireEvent.change(urlInputs[2], { target: { value: "http://example.net" } });
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Wait for the metadata to be displayed
    const title1 = await waitFor(() => screen.getByText("Example Title 1"));
    const description1 = screen.getByText("Example Description 1");
    const image1 = screen.getByAltText("Example Title 1"); // Assuming the image uses alt text based on the title

    const title2 = screen.getByText("Example Title 2");
    const description2 = screen.getByText("Example Description 2");
    const image2 = screen.getByAltText("Example Title 2");

    const title3 = screen.getByText("Example Title 3");
    const description3 = screen.getByText("Example Description 3");
    const image3 = screen.getByAltText("Example Title 3");

    // Assertions
    expect(title1).toBeInTheDocument();
    expect(description1).toBeInTheDocument();
    expect(image1).toBeInTheDocument();

    expect(title2).toBeInTheDocument();
    expect(description2).toBeInTheDocument();
    expect(image2).toBeInTheDocument();

    expect(title3).toBeInTheDocument();
    expect(description3).toBeInTheDocument();
    expect(image3).toBeInTheDocument();
  });
});
