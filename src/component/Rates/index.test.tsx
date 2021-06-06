import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastsProvider } from "toasts";
import Rates from ".";

jest.mock("api");

it("delete button should delete row", async () => {
  await setup();
  userEvent.click(screen.getByRole("button", { name: /deleterate/i }));
  await waitForElementToBeRemoved(() => screen.queryByText("45000"));
});

it("edit button should edit the rate", async () => {
  await setup();
  userEvent.click(screen.getByRole("button", { name: /editrate/i }));

  const goldRateInput = screen.getByLabelText(/Gold rate/i);
  userEvent.clear(goldRateInput);
  userEvent.type(goldRateInput, "55000");
  userEvent.click(screen.getByText(/submit/i));
  await waitForElementToBeRemoved(() => screen.queryByText(/Add new rate/i));
  await waitFor(() => {
    expect(screen.getByText("55000")).toBeInTheDocument();
  });
});

const setup = async () => {
  const utils = render(
    <ToastsProvider>
      <Rates />
    </ToastsProvider>
  );
  await waitFor(() => {
    expect(screen.getByText("45000")).toBeInTheDocument();
  });

  return utils;
};
