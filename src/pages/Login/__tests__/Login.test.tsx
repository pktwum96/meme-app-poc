import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Login } from "../index";

describe("Login Page", () => {
  it("renders login page with title", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
