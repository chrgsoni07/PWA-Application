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

const bill = {
  totalNew: "109,566",
  totalOld: "74,300",
  diff: "35,266",
  discount: "66",
  payable: "35,200",
  paid: "30000",
  due: "5,200",
  newItems: [
    {
      type: "Gold",
      name: "Haar",
      weight: "18.270",
      rate: "49500",
      makingCharges: "200",
      otherCharges: "",
      amount: "₹94,091",
    },
    {
      type: "Silver",
      name: "Gola Payal",
      weight: "235",
      rate: "65000",
      makingCharges: "",
      otherCharges: "",
      amount: "₹15,275",
    },
    {
      type: "Silver per piece",
      name: "Bicchi",
      weight: "",
      rate: "",
      makingCharges: "",
      otherCharges: "200",
      amount: "₹200",
    },
  ],
  oldItems: [
    {
      type: "Gold",
      name: "Purana Haar",
      weight: "15.780",
      purity: "90",
      netWeight: "14.202",
      rate: "49500",
      amount: "₹70,300",
    },
    {
      type: "Silver",
      name: "Purani Payjab",
      weight: "80",
      purity: "100",
      netWeight: "80",
      rate: "50000",
      amount: "₹4,000",
    },
  ],
};

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

    bill.newItems.forEach((item, i) => editNewItemsRow(item, i + 1));
    userEvent.click(screen.getByRole("tab", { name: /old item/i }));
    bill.oldItems.forEach((item, i) => editOldItemsRow(item, i + 1));
    expect(screen.getByLabelText("Total new")).toHaveValue(bill.totalNew);
    expect(screen.getByLabelText("Total old")).toHaveValue(bill.totalOld);
    expect(screen.getByLabelText("Old New Difference")).toHaveValue(bill.diff);
    userEvent.type(screen.getByLabelText("Discount"), bill.discount);
    expect(screen.getByLabelText("Amount payable")).toHaveValue(bill.payable);
    userEvent.type(screen.getByLabelText("Amount paid"), bill.paid);
    expect(screen.getByLabelText("Due")).toHaveValue(bill.due);
  });
});

const editNewItemsRow = (item: any, i: number) => {
  userEvent.click(screen.getByRole("button", { name: /addNewItemRow/i }));
  clickEditButton(i);
  fillDetails(item, i);
  saveRow(i);
  checkAmount(screen.getAllByRole("row")[i], item.amount, 6);
};

const editOldItemsRow = (item: any, i: number) => {
  userEvent.click(screen.getByRole("button", { name: /addOldItemRow/i }));
  clickEditButton(i);
  fillOldItemsDetails(item, i);
  saveRow(i);
  checkAmount(screen.getAllByRole("row")[i], item.amount, 6);
};

const clickEditButton = (index: number) => {
  const row = screen.getAllByRole("row")[index];
  userEvent.click(within(row).getAllByRole("button")[0]);
};

const fillDetails = (item: any, i: number) => {
  const row = screen.getAllByRole("row")[i];
  selectType(row, item.type, 0);
  enterName(row, item.name, 1);
  enterWeight(row, item.weight, 2);
  enterRate(row, item.rate, 3);
  enterMakingCharges(row, item.makingCharges, 4);
  enterOtherCharges(row, item.otherCharges, 5);
};

const selectType = (row: HTMLElement, type: string, colIndex: number) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.click(within(cells[colIndex]).getByRole("button"));
  userEvent.click(screen.getByLabelText(type));
};

const enterName = (row: HTMLElement, name: string, colIndex: number) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[colIndex]).getByRole("textbox"), name);
};
const enterWeight = (row: HTMLElement, weight: string, colIndex: number) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[colIndex]).getByRole("textbox"), weight);
};
const enterRate = (row: HTMLElement, rate: string, colIndex: number) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[colIndex]).getByRole("textbox"), rate);
};
const enterMakingCharges = (
  row: HTMLElement,
  makingCharges: string,
  colIndex: number
) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(
    within(cells[colIndex]).getByRole("spinbutton"),
    makingCharges
  );
};
const enterOtherCharges = (
  row: HTMLElement,
  otherCharges: string,
  colIndex: number
) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.type(within(cells[colIndex]).getByRole("spinbutton"), otherCharges);
};

// const rowTotal = () => {
//   const row = screen.getAllByRole("row")[1];
//   const cells = within(row).getAllByRole("cell");
//   return cells[6];
// };

const saveRow = (i: number) => {
  const row = screen.getAllByRole("row")[i];
  const cells = within(row).getAllByRole("cell");
  userEvent.click(within(cells[7]).getAllByRole("button")[0]);
};

const fillOldItemsDetails = (item: any, i: number) => {
  const row = screen.getAllByRole("row")[i];
  selectType(row, item.type, 0);
  enterName(row, item.name, 1);
  enterWeight(row, item.weight, 2);
  enterPurity(row, item.purity, 3);
  checkNetWeight(row, item.netWeight, 4);
  enterRate(row, item.rate, 5);
};

const enterPurity = (row: HTMLElement, purity: string, colIndex: number) => {
  const cells = within(row).getAllByRole("cell");
  userEvent.clear(within(cells[colIndex]).getByRole("spinbutton"));
  userEvent.type(within(cells[colIndex]).getByRole("spinbutton"), purity);
};

const checkNetWeight = (
  row: HTMLElement,
  netWeight: string,
  colIndex: number
) => {
  const cells = within(row).getAllByRole("cell");
  expect(within(cells[colIndex]).getByText(netWeight)).toBeInTheDocument();
};

const checkAmount = (row: HTMLElement, amount: string, colIndex: number) => {
  const cells = within(row).getAllByRole("cell");
  expect(within(cells[colIndex]).getByText(amount)).toBeInTheDocument();
};
