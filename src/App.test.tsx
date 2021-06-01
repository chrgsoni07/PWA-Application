import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App";
jest.mock("api");
describe("App", () => {
  it("should render", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });

    userEvent.click(screen.getByRole("menuitem", { name: "Customers" }));
    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
    userEvent.click(screen.getByRole("menuitem", { name: "Bills" }));
    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
    userEvent.click(screen.getByRole("menuitem", { name: "Gold/Silver Rate" }));
    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
    userEvent.click(screen.getByRole("menuitem", { name: "Item" }));
    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
  });
});
