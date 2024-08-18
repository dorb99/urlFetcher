import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormContainer from "./FormContainer";

// Mock the MetaDisplayer component
vi.mock('../metadisplayer/MetaDisplayer', () => ({
    __esModule: true,
    default: () => <div>MetaDisplayer</div>,
  }));
  
describe("Urls list", () => {
  it('should add a new URL input field when "Add Url" button is clicked', () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    // Adding a new field to remove
    const addUrlButton = screen.getByText(/Add Url/i);
    fireEvent.click(addUrlButton);

    // Assertions
    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(urlInputs.length).toBe(4); // Initial 3 + 1 added
  });

  it('should remove a URL input field when "Remove Url" button is clicked', () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    // Add a new field to remove
    const addUrlButton = screen.getByText(/Add Url/i);
    fireEvent.click(addUrlButton);

    // Removing url field
    const removeUrlButton = screen.getByText(/Remove Url/i);
    fireEvent.click(removeUrlButton);

    // Assertions
    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(urlInputs.length).toBe(3);
  });

  it("should not remove URL input fields below the initial count of 3", () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    // Add a new field to remove
    const addUrlButton = screen.getByText(/Add Url/i);
    fireEvent.click(addUrlButton);

    // Removing url fields
    const removeUrlButton = screen.getByText(/Remove Url/i);
    fireEvent.click(removeUrlButton);
    fireEvent.click(removeUrlButton);
    fireEvent.click(removeUrlButton);

    // Assertions
    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(urlInputs.length).toBe(3);
  });
});

describe("Form handling", () => {
  it("should display an error when trying to submit with empty URL fields", async () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    // Submmiting the form
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Check if MetaDisplayer is not present 
    const metaDisplayer = screen.queryByText('MetaDisplayer');
    expect(metaDisplayer).toBeNull();
  });

  it("should call submitUrls function with non-empty URL fields when form is submitted", () => {
    const mockSubmitUrls = vi.fn();
    render(<FormContainer submitUrls={mockSubmitUrls} />);

    // Entering values to the input fields
    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    fireEvent.change(urlInputs[0], { target: { value: "http://example.com" } });
    fireEvent.change(urlInputs[1], { target: { value: "http://example.org" } });
    fireEvent.change(urlInputs[2], { target: { value: "http://example.net" } });

    // Submmiting the form
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Assertions
    expect(mockSubmitUrls).toHaveBeenCalledWith([
      "http://example.com",
      "http://example.org",
      "http://example.net",
    ]);
  });
});
