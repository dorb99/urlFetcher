import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormContainer from "./FormContainer";

vi.mock('../metadisplayer/MetaDisplayer', () => ({
    __esModule: true,
    default: () => <div>MetaDisplayer</div>,
  }));
  
describe("Urls list", () => {
  it('Adding a new URL input field when "Add Url" button is clicked', () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    const addUrlButton = screen.getByText(/Add Url/i);
    fireEvent.click(addUrlButton);

    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(urlInputs.length).toBe(4); // Initial 3 + 1 added
  });

  it('Removing a URL input field when "Remove Url" button is clicked', () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    const addUrlButton = screen.getByText(/Add Url/i);
    fireEvent.click(addUrlButton);

    const removeUrlButton = screen.getByText(/Remove Url/i);
    fireEvent.click(removeUrlButton);

    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(urlInputs.length).toBe(3);
  });

  it("Should not remove URL input fields below the initial count of 3", () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    const addUrlButton = screen.getByText(/Add Url/i);
    fireEvent.click(addUrlButton);

    const removeUrlButton = screen.getByText(/Remove Url/i);
    fireEvent.click(removeUrlButton);
    fireEvent.click(removeUrlButton);
    fireEvent.click(removeUrlButton);

    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(urlInputs.length).toBe(3);
  });
});

describe("Form handling", () => {
  it("Display an error when trying to submit with empty URL fields", async () => {
    render(<FormContainer submitUrls={vi.fn()} />);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    const metaDisplayer = screen.queryByText('MetaDisplayer');
    expect(metaDisplayer).toBeNull();
  });

  it("Call submitUrls function with non-empty URL fields when form is submitted", () => {
    const mockSubmitUrls = vi.fn();
    render(<FormContainer submitUrls={mockSubmitUrls} />);

    const urlInputs = screen.getAllByPlaceholderText(/Enter URL/i);
    fireEvent.change(urlInputs[0], { target: { value: "http://example.com" } });
    fireEvent.change(urlInputs[1], { target: { value: "http://example.org" } });
    fireEvent.change(urlInputs[2], { target: { value: "http://example.net" } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    expect(mockSubmitUrls).toHaveBeenCalledWith([
      "http://example.com",
      "http://example.org",
      "http://example.net",
    ]);
  });
});
