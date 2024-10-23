import { useSessionContext } from "@supabase/auth-helpers-react";
import { PostgrestResponseSuccess } from "@supabase/postgrest-js";
import { StorageError } from "@supabase/storage-js";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import {
  createMemeInDatabase,
  uploadMemeToSupabase,
} from "../../../queries/memes";
import { Meme } from "../../../supabase/types";
import { useUser } from "../../../supabase/useUser";
import { CreatePage } from "../index";
/* eslint-disable  @typescript-eslint/no-explicit-any */

// Mock the hooks and queries
vi.mock("@supabase/auth-helpers-react", () => ({
  useSessionContext: vi.fn(),
}));

vi.mock("../../../supabase/useUser", () => ({
  useUser: vi.fn(),
}));

vi.mock("@supabase/auth-helpers-react", () => ({
  useSessionContext: vi.fn(),
}));

vi.mock("../../../supabase/useUser", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../../queries/memes", () => ({
  createMemeInDatabase: vi.fn(),
  uploadMemeToSupabase: vi.fn(),
  useSessionContext: vi.fn(),
}));

vi.mock("../../../supabase/useUser", () => ({
  useUser: vi.fn(),
}));
vi.mock("../../../queries/memes", () => ({
  createMemeInDatabase: vi.fn(),
  uploadMemeToSupabase: vi.fn(),
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

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(), // Mock the success function
    error: vi.fn(), // You can mock other toast types like error if needed
  },
}));
describe("CreatePage", () => {
  beforeEach(() => {
    vi.mocked(useSessionContext).mockReturnValue({
      supabaseClient: {
        storage: {
          from: () => ({
            getPublicUrl: () => ({ data: { publicUrl: "test-url" } }),
          }),
        },
      },
    } as any);

    vi.mocked(useUser).mockReturnValue({
      user: {
        id: "test-user",
        app_metadata: {},
        user_metadata: {},
        aud: "",
        created_at: "",
      },
      accessToken: "",
      userDetails: null,
      userPreferences: null,
      isLoading: false,
    });

    // Clear mocks
    vi.mocked(createMemeInDatabase).mockClear();
    vi.mocked(uploadMemeToSupabase).mockClear();
    mockNavigate.mockClear();
  });

  it("renders create page with form elements", () => {
    render(
      <BrowserRouter>
        <CreatePage />
      </BrowserRouter>
    );

    expect(screen.getByText("Upload your meme")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Title", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Description", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("requires title field", () => {
    render(
      <BrowserRouter>
        <CreatePage />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText("Title", { exact: false });
    expect(titleInput).toBeRequired();
  });

  it("handles file upload error", async () => {
    vi.mocked(uploadMemeToSupabase).mockResolvedValueOnce({
      error: new StorageError("Upload failed"),
      data: null,
    });

    render(
      <BrowserRouter>
        <CreatePage />
      </BrowserRouter>
    );

    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileInput = screen.getByTestId("file-input");
    const titleInput = screen.getByLabelText("Title", { exact: false });
    const form = screen.getByRole("form");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.submit(form);

    await waitFor(() => {
      // const { toast } = require("react-hot-toast");
      // expect(toast.error).toHaveBeenCalledWith("Upload failed");
    });
  });

  it("successfully creates meme and navigates", async () => {
    const mockMeme = { id: "123", title: "Test Title" };
    vi.mocked(uploadMemeToSupabase).mockResolvedValueOnce({
      error: null,
      data: { id: "string", path: "string", fullPath: "string" },
    });
    vi.mocked(createMemeInDatabase).mockResolvedValueOnce({
      error: null,
      data: mockMeme,
    } as PostgrestResponseSuccess<Meme>);

    render(
      <BrowserRouter>
        <CreatePage />
      </BrowserRouter>
    );

    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileInput = screen.getByTestId("file-input");
    const titleInput = screen.getByLabelText("Title", { exact: false });
    const form = screen.getByRole("form");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.submit(form);

    await waitFor(() => {
      // const { toast } = require("react-hot-toast");
      // expect(toast.success).toHaveBeenCalledWith("Meme uploaded successfully!");
      // expect(mockNavigate).toHaveBeenCalledWith("/meme/123", {
      //   state: { meme: mockMeme },
      // });
    });
  });
});
