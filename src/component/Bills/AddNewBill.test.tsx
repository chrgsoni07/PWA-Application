import React from "react";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddNewBill } from "./AddNewBill";
import { defaultBill } from "./commonData";

jest.mock("api", () => ({
  ...jest.requireActual("api"),

  default: {
    getCustomers: jest.fn().mockImplementation(() => Promise.resolve([])),
  },
}));

let mockSetBill = jest.fn();
let mockSetDisplayDialog = jest.fn();

describe("Add new bill component", () => {
  beforeEach(() => {});
  it("should add new items", () => {
    render(
      <AddNewBill
        displayDialog={true}
        setDisplayDialog={mockSetDisplayDialog}
        bill={defaultBill()}
        setBill={mockSetBill}
      />
    );

    userEvent.click(screen.getByRole("button", { name: /addNewItemRow/i }));

    editRow();

    expect(screen.getByLabelText("Total new")).toHaveValue("1,080,000");
  });
});

const editRow = () => {
  clickEditButton();
  fillDetails();
  saveRow();
  expect(within(rowTotal()).getByText("₹10,80,000")).toBeInTheDocument();
};

const clickEditButton = () => {
  const row = screen.getAllByRole("row")[1];
  userEvent.click(within(row).getAllByRole("button")[0]);
};

const fillDetails = () => {
  const row = screen.getAllByRole("row")[1];
  selectType(row);
  enterName(row);
  enterWeight(row);
  enterRate(row);
  enterMakingCharges(row);
  enterOtherCharges(row);
};

const selectType = (row: HTMLElement) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.click(within(cells[0]).getByRole("button"));
  userEvent.click(screen.getByLabelText(/Gold/i));
};

const enterName = (row: HTMLElement) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[1]).getByRole("textbox"), "Item Name");
};
const enterWeight = (row: HTMLElement) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[2]).getByRole("textbox"), "200");
};
const enterRate = (row: HTMLElement) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[3]).getByRole("textbox"), "49000");
};
const enterMakingCharges = (row: HTMLElement) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[4]).getByRole("spinbutton"), "500");
};
const enterOtherCharges = (row: HTMLElement) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[5]).getByRole("spinbutton"), "0");
};

const rowTotal = () => {
  const row = screen.getAllByRole("row")[1];
  const cells = within(row).getAllByRole("cell");
  return cells[6];
};

const saveRow = () => {
  const row = screen.getAllByRole("row")[1];
  const cells = within(row).getAllByRole("cell");
  userEvent.click(within(cells[7]).getAllByRole("button")[0]);
};
