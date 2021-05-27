import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bills from ".";

jest.mock("api");

describe("Bills", () => {
  it("should render", () => {
    render(<Bills />);
    userEvent.click(screen.getByRole("button", { name: "New" }));
    userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(1).toBe(1);
  });
});
