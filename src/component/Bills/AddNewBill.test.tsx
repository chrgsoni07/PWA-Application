import React from "react";

import { render, screen } from "@testing-library/react";
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

import * as api from "api";

describe("Add new bill component", () => {
  beforeEach(() => {
    console.log("api", api);
  });
  it("should add new items", () => {
    render(
      <AddNewBill
        displayDialog={true}
        setDisplayDialog={mockSetDisplayDialog}
        bill={defaultBill()}
        setBill={mockSetBill}
      />
    );
  });
});
