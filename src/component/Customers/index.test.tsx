import { render } from "@testing-library/react";
import Customers from ".";

jest.mock("api");

describe("Customers", () => {
  it("should render", () => {
    render(<Customers />);
  });
});
