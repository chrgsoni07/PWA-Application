import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastsProvider } from "toasts";
import Bills from ".";

jest.mock("api");

describe("Bills", () => {
  it("should render", async () => {
    render(
      <ToastsProvider>
        <Bills />
      </ToastsProvider>
    );

    await screen.findByRole("button", { name: "editBill" });
    userEvent.click(screen.getByRole("button", { name: "New" }));
    userEvent.click(screen.getByRole("button", { name: /close/i }));
    userEvent.click(screen.getByRole("button", { name: "editBill" }));
    expect(screen.getByText("Chaupat Raja")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(4);
    expect(1).toBe(1);
  });
});
