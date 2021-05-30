import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastsProvider } from "toasts";
import Bills from ".";

jest.mock("api");

describe("Bills", () => {
  it("should render", async () => {
    const { asFragment } = render(
      <ToastsProvider>
        <Bills />
      </ToastsProvider>
    );
    const firstRender = asFragment();
    await screen.findByRole("button", { name: "editBill" });

    const tableloaded = asFragment();
    expect(firstRender).toMatchDiffSnapshot(tableloaded);
    userEvent.click(screen.getByRole("button", { name: "editBill" }));

    expect(screen.getByText("2020202020")).toBeInTheDocument();
    const newItemTab = screen.getByRole("tabpanel", { name: "New Item" });
    expect(within(newItemTab).getAllByRole("row")).toHaveLength(4);
    userEvent.click(screen.getByRole("button", { name: /close/i }));
    // const dialogOpened = asFragment();
    // expect(tableloaded).toMatchDiffSnapshot(dialogOpened);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("dialog", { name: /new bill/i })
    );
    userEvent.click(screen.getByRole("button", { name: /viewBill/i }));
    expect(
      screen.getByRole("dialog", { name: /r k jewellers jawad/i })
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /close/i }));
  });
});
