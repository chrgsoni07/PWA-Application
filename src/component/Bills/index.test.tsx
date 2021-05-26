import { render } from "@testing-library/react";
import Bills from ".";

jest.mock("api", () => ({
  ...jest.requireActual("api"),

  default: {
    getBills: jest.fn().mockImplementation(() => Promise.resolve([])),
  },
}));

describe("Bills", () => {
  it("should render", () => {
    render(<Bills />);
  });
});
