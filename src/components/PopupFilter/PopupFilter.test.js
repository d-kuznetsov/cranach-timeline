import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopupFilter from "./index";

describe("PopupFilter", () => {
  const childrenStr = "Content";
  it("renders content only after click", () => {
    const { getByRole, getByText, queryByText } = render(
      <PopupFilter>
        <div>{childrenStr}</div>
      </PopupFilter>
    );
    expect(queryByText(childrenStr)).toBeNull();
    userEvent.click(getByRole("button"));
    expect(getByText(childrenStr)).toBeInTheDocument();
  });
});
