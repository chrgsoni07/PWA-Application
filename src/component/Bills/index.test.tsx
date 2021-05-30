import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastsProvider } from "toasts";
import Bills from ".";

jest.mock("api");

describe("Bills", () => {
  it("should render bills table", async () => {
    const { asFragment } = render(
      <ToastsProvider>
        <Bills />
      </ToastsProvider>
    );
    const firstRender = asFragment();
    await screen.findByRole("button", { name: "editBill" });

    const tableloaded = asFragment();
    expect(firstRender).toMatchDiffSnapshot(tableloaded);
  });

  it("should render edit bill", async () => {
    const { asFragment } = render(
      <ToastsProvider>
        <Bills />
      </ToastsProvider>
    );
    await screen.findByRole("button", { name: "editBill" });
    const beforeEditBill = asFragment();

    userEvent.click(screen.getByRole("button", { name: "editBill" }));

    expect(screen.getByText("2020202020")).toBeInTheDocument();
    expect(beforeEditBill).toMatchDiffSnapshot(asFragment());

    const newItemTab = screen.getByRole("tabpanel", { name: "New Item" });
    expect(within(newItemTab).getAllByRole("row")).toHaveLength(4);
    userEvent.click(screen.getByRole("button", { name: /close/i }));
  });

  it("shoud render view bill", async () => {
    const { asFragment } = render(
      <ToastsProvider>
        <Bills />
      </ToastsProvider>
    );
    await screen.findByRole("button", { name: "editBill" });
    const beforeViewBill = asFragment();
    userEvent.click(screen.getByRole("button", { name: /viewBill/i }));
    expect(
      screen.getByRole("dialog", { name: /r k jewellers jawad/i })
    ).toBeInTheDocument();
    expect(beforeViewBill).toMatchDiffSnapshot(asFragment());
    userEvent.click(screen.getByRole("button", { name: /close/i }));
  });
});
