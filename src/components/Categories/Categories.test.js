import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryComponent as Categories } from "./index";

describe("Categories", () => {
  const label = "paitings";
  const mockFn = jest.fn();
  const props = {
    categories: {
      1: {
        id: 1,
        label,
        mainColor: "#AABBCC",
        displayed: true,
      },
    },
    onChange: mockFn,
  };

  it("renders checkbox & label", () => {
    const { getByText, getByRole } = render(<Categories {...props} />);
    expect(getByRole("checkbox")).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
  });

  it("fires change handler", () => {
    const { getByRole } = render(<Categories {...props} />);
    // Material UI uses click event
    userEvent.click(getByRole("checkbox"));
    expect(mockFn).toHaveBeenCalled();
  });
});
