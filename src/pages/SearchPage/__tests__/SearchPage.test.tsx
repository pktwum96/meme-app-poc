import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SearchPage } from "../index";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("SearchPage", () => {
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
  });

  it("renders search bar and filter button", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();
  });

  it("toggles filter section when filter button is clicked", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton);

    expect(screen.getByText("Media Type")).toBeInTheDocument();
  });

  it("updates URL params when filters are applied", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton);

    const applyButton = screen.getByRole("button", { name: /apply filters/i });
    fireEvent.click(applyButton);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
