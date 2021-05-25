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
  const row = screen.getAllByRole("row")[i];
  clickEditButton(i);
  const cells = within(row).getAllByRole("cell");
  fillDetails(item, i);
  saveRow(i);
  checkAmount(cells[6], item.amount);
};

const editOldItemsRow = (item: any, i: number) => {
  userEvent.click(screen.getByRole("button", { name: /addOldItemRow/i }));
  const row = screen.getAllByRole("row")[i];
  clickEditButton(i);
  const cells = within(row).getAllByRole("cell");
  fillOldItemsDetails(item, i);
  saveRow(i);
  checkAmount(cells[6], item.amount);
};

const clickEditButton = (index: number) => {
  const row = screen.getAllByRole("row")[index];
  userEvent.click(within(row).getAllByRole("button")[0]);
};

const fillDetails = (item: any, i: number) => {
  const row = screen.getAllByRole("row")[i];
  const cells = within(row).getAllByRole("cell");
  selectType(cells[0], item.type);
  enterName(cells[1], item.name);
  enterWeight(cells[2], item.weight);
  enterRate(cells[3], item.rate);
  enterMakingCharges(cells[4], item.makingCharges);
  enterOtherCharges(cells[5], item.otherCharges);
};

const selectType = (cell: HTMLElement, type: string) => {
  userEvent.click(within(cell).getByRole("button"));
  userEvent.click(screen.getByLabelText(type));
};

const enterName = (cell: HTMLElement, name: string) => {
  userEvent.type(within(cell).getByRole("textbox"), name);
};
const enterWeight = (cell: HTMLElement, weight: string) => {
  userEvent.type(within(cell).getByRole("textbox"), weight);
};
const enterRate = (cell: HTMLElement, rate: string) => {
  userEvent.type(within(cell).getByRole("textbox"), rate);
};
const enterMakingCharges = (cell: HTMLElement, makingCharges: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), makingCharges);
};
const enterOtherCharges = (cell: HTMLElement, otherCharges: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), otherCharges);
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
  const cells = within(row).getAllByRole("cell");
  selectType(cells[0], item.type);
  enterName(cells[1], item.name);
  enterWeight(cells[2], item.weight);
  enterPurity(cells[3], item.purity);
  checkNetWeight(cells[4], item.netWeight);
  enterRate(cells[5], item.rate);
};

const enterPurity = (cell: HTMLElement, purity: string) => {
  userEvent.clear(within(cell).getByRole("spinbutton"));
  userEvent.type(within(cell).getByRole("spinbutton"), purity);
};

const checkNetWeight = (cell: HTMLElement, netWeight: string) => {
  expect(within(cell).getByText(netWeight)).toBeInTheDocument();
};

const checkAmount = (cell: HTMLElement, amount: string) => {
  expect(within(cell).getByText(amount)).toBeInTheDocument();
};
