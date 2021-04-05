import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewerComponent as Viewer } from "./index";

describe("Viewer", () => {
  const mockFn = jest.fn();
  const props = {
    open: false,
    data: {
      categoryId: 1,
      involvedPersons: [],
      titles: [],
      objectId: 123,
      dating: {
        dated: 1500,
        begin: 1500,
        end: 1505,
      },
      owner: "Düsseldorf",
      images: {
        sizes: {
          m: {
            dimensions: {
              width: 120,
              height: 100,
            },
            src: "",
          },
        },
      },
      locations: [{ term: "Düsseldorf" }],
    },
    imageSize: "m",
    onClose: mockFn,
  };

  it("renders no content if open prop is false", () => {
    const { queryByRole } = render(<Viewer {...props} />);
    expect(queryByRole("button")).toBeNull();
  });

  it("renders image and fires close handler", () => {
    const { getByRole, getByTestId } = render(<Viewer {...{ ...props, open: true }} />);
    expect(getByRole("img")).toBeInTheDocument();
    userEvent.click(getByTestId("close-btn"));
    expect(mockFn).toBeCalled();
  });
});
