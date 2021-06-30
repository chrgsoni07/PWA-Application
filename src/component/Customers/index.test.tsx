import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastsProvider } from "toasts";
import Customers from ".";

jest.mock("api");

it("delete button should delete customer", async () => {
  await setup();
  userEvent.click(screen.getByRole("button", { name: /Delete customer/i }));
  await waitForElementToBeRemoved(() => screen.queryByText("Ramadhir"));
});

it.skip("edit button should edit the customer", async () => {
  await setup();
  userEvent.click(screen.getByRole("button", { name: /Edit customer/i }));

  const nameInput = screen.getByLabelText(/name/i);
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "Chagan");
  userEvent.click(screen.getByText(/submit/i));
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Add new customer/i)
  );
  await waitFor(() => {
    expect(screen.getByText("Chagan")).toBeInTheDocument();
  });
});

it.skip("add button should add new customer", async () => {
  await setup();
  userEvent.click(screen.getByRole("button", { name: /new/i }));

  userEvent.type(screen.getByLabelText(/name/i), "Mangilal");
  userEvent.type(screen.getByLabelText(/place/i), "Senti");
  userEvent.click(screen.getByText(/submit/i));
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Add new customer/i)
  );
  await waitFor(() => {
    expect(screen.getByText("Mangilal")).toBeInTheDocument();
    expect(screen.getByText("Senti")).toBeInTheDocument();
  });
});

it("submitting the form with empty value should show validation", async () => {
  await setup();
  userEvent.click(screen.getByRole("button", { name: /new/i }));
  userEvent.click(screen.getByText(/submit/i));
  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/place is required/i)).toBeInTheDocument();
  });
});

const setup = async () => {
  const utils = render(
    <ToastsProvider>
      <Customers />
    </ToastsProvider>
  );
  await waitFor(() => {
    expect(screen.getByText("Ramadhir")).toBeInTheDocument();
  });

  return utils;
};
