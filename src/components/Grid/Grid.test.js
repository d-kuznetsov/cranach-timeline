import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GridComponent as Grid } from "./index";

describe("Grid", () => {
  // Jest runs in JSDom which doesn't support measurements APIs.
  const mockOffsetSize = function () {
    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        value: 900,
      },
      offsetWidth: {
        value: 1600,
      },
    });
  };

  const authorName = "Cranach";
  const artworkName = "Wald";
  const items = [
    {
      categoryId: 1,
      involvedPersons: [{ name: authorName }],
      titles: [{ title: artworkName }],
      objectId: 123,
      dating: {
        dated: 1500,
        begin: 1500,
        end: 1505,
      },
      owner: "Düsseldorf",
      images: {
        sizes: {
          s: {
            dimensions: {
              width: 120,
              height: 100,
            },
            src: "",
          },
          xs: {
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
  ];
  const mockFn = jest.fn();
  const props = {
    items,
    imageWidth: 100,
    imageHeight: 100,
    space: 5,
    onItemClick: mockFn,
  };

  mockOffsetSize();

  it("renders image, artwork name & author name", () => {
    const { getByRole, getByText } = render(<Grid {...props} />);
    expect(getByRole("img")).toBeInTheDocument();
    expect(getByText(authorName)).toBeInTheDocument();
    expect(getByText(artworkName)).toBeInTheDocument();
  });

  it("fires click handler", () => {
    const { getByRole } = render(<Grid {...props} />);
    userEvent.click(getByRole("img"));
    expect(mockFn).toHaveBeenCalledWith(props.items[0]);
  });
});
