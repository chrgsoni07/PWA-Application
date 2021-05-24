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
  });
});

const editRow = () => {
  clickEditButton();
  fillDetails();
};

const clickEditButton = () => {
  const row = screen.getAllByRole("row")[1];
  userEvent.click(within(row).getAllByRole("button")[0]);
};

const fillDetails = () => {
  const row = screen.getAllByRole("row")[1];
  const cells = within(row).getAllByRole("cell");
  userEvent.click(cells[0]);
  userEvent.click(screen.getByRole("option", { name: /Gold/i }));
};
