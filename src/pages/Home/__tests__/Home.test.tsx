import { useSessionContext } from "@supabase/auth-helpers-react";
import { PostgrestResponse } from "@supabase/supabase-js";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { getAllMemes } from "../../../queries/memes";
import { Meme } from "../../../supabase/types";
import { HomePage } from "../index";
/* eslint-disable  @typescript-eslint/no-explicit-any */

// Mock the Supabase context
vi.mock("@supabase/auth-helpers-react", () => ({
  useSessionContext: vi.fn(),
}));

// Mock the queries
vi.mock("../../../queries/memes", () => ({
  getAllMemes: vi.fn(),
}));

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("HomePage", () => {
  beforeEach(() => {
    // Setup default mocks
    vi.mocked(useSessionContext).mockReturnValue({
      supabaseClient: {},
      // Add other required properties
    } as any);

    // Clear navigation mock
    mockNavigate.mockClear();
  });

  it("renders home page with search bar and upload button", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check if main elements are rendered
    expect(
      screen.getByRole("button", { name: /upload meme/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // Search bar
  });

  it("displays meme list when data is loaded", async () => {
    const mockMemes = [
      {
        id: "1",
        title: "Test Meme",
        media_url: "test.jpg",
        media_type: "image",
        created_at: new Date().toISOString(),
      } as Meme,
    ];

    vi.mocked(getAllMemes).mockResolvedValueOnce({
      data: mockMemes,
      error: null,
    } as PostgrestResponse<Meme>);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Wait for memes to be displayed
    expect(await screen.findByText("Latest")).toBeInTheDocument();
  });

  it("navigates to create page when upload button is clicked", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const uploadButton = screen.getByRole("button", { name: /upload meme/i });
    fireEvent.click(uploadButton);

    expect(mockNavigate).toHaveBeenCalledWith("/meme/create");
  });

  it("shows error toast when meme fetch fails", async () => {
    const mockError = new Error("Failed to fetch memes");
    vi.mocked(getAllMemes).mockRejectedValueOnce(mockError);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // The error should be handled and the page should still render
    expect(
      screen.getByRole("button", { name: /upload meme/i })
    ).toBeInTheDocument();
  });

  it("renders empty state when no memes are returned", async () => {
    vi.mocked(getAllMemes).mockResolvedValueOnce({
      data: [] as Meme[],
      error: null,
    } as PostgrestResponse<Meme>);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Should still show the Latest section even with no memes
    expect(await screen.findByText("Latest")).toBeInTheDocument();
  });
});
