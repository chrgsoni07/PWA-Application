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

    ["Customers", "Bills", "Gold/Silver Rate", "Item"].forEach(
      async (menuItem) => {
        userEvent.click(screen.getByRole("menuitem", { name: menuItem }));
        await waitFor(() =>
          expect(screen.queryAllByRole("row")).toHaveLength(2)
        );
      }
    );
  });
});
