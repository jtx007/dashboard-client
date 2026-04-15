import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vite-plus/test";
import { ThemeProvider, useTheme } from "@/components/theme-provider";

function ThemeDisplay() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("renders children with default system theme", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
  });

  it("reads initial theme from localStorage", () => {
    localStorage.setItem("vite-ui-theme", "dark");
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("applies theme class to document root", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeDisplay />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("updates theme and persists to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeDisplay />
      </ThemeProvider>,
    );

    await act(async () => {
      await user.click(screen.getByText("Set Dark"));
    });

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
  });
});
