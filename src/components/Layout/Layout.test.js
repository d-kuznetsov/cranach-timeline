import { render } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { createReduxStore } from "../../redux/store";
import Layout from "./index";

jest.mock("next/router", () => {
  return {
    __esModule: true,
    useRouter() {
      return {
        pathname: "/",
      };
    },
  };
});
jest.mock("axios");

describe("Layout", () => {
  it("makes request to api", () => {
    const mockFn = jest.fn().mockResolvedValue({ data: [] });
    axios.get = mockFn;
    render(
      <Provider store={createReduxStore()}>
        <Layout />
      </Provider>
    );
    expect(mockFn).toBeCalledWith("api/data");
  });
});
