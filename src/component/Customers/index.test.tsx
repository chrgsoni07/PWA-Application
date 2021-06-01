import { render, waitFor, screen } from "@testing-library/react";
import Customers from ".";

jest.mock("api");

describe("Customers", () => {
  it("should render", async () => {
    render(<Customers />);
    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
  });
});
