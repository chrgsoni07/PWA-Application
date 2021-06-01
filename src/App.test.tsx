import { render } from "@testing-library/react";
import App from "App";
jest.mock("api");
describe("App", () => {
  it("should render", () => {
    render(<App />);
  });
});
