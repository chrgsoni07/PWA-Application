import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastsProvider } from "toasts";
import Bills from "..";

jest.mock("api");

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
  render(
    <ToastsProvider>
      <Bills />
    </ToastsProvider>
  );
  await screen.findByRole("button", { name: "editBill" });

  userEvent.click(screen.getByRole("button", { name: "editBill" }));
  await waitFor(() => {
    expect(screen.getByLabelText("Select customer")).not.toBeDisabled();
  });
  expect(screen.getByText("2020202020")).toBeInTheDocument();

  const newItemTab = screen.getByRole("tabpanel", { name: "New Item" });
  expect(within(newItemTab).getAllByRole("row")).toHaveLength(5);
  userEvent.click(screen.getByRole("button", { name: /close/i }));
});

it("shoud render view bill", async () => {
  render(
    <ToastsProvider>
      <Bills />
    </ToastsProvider>
  );
  await screen.findByRole("button", { name: /viewBill/i });
  userEvent.click(screen.getByRole("button", { name: /viewBill/i }));
  await screen.findByRole("dialog", { name: /View bill/i });

  userEvent.click(screen.getByRole("button", { name: /close/i }));
});
