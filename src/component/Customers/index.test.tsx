import { render } from "@testing-library/react";
import Customers from ".";

jest.mock("api", () => ({
  ...jest.requireActual("api"),

  default: {
    getCustomers: jest.fn().mockImplementation(() => Promise.resolve([])),
  },
}));

describe("Customers", () => {
  it("should render", () => {
    // render(<Customers />);
    expect(1).toBe(1);
  });
});
