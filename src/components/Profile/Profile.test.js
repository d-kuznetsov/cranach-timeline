import { render } from "@testing-library/react";
import Profile from "./index";

describe("Profile", () => {
  const props = {
    name: "Max",
    occupation: "Developer",
    phone: "+123456789",
    email: "max@mail.com",
    avatar: "image-src",
  };

  it("renders name, occupation, phone, email & image ", () => {
    const { getByRole, getByText } = render(<Profile {...props} />);

    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(props.occupation)).toBeInTheDocument();
    expect(getByText(props.phone)).toBeInTheDocument();
    expect(getByText(props.email)).toBeInTheDocument();
    expect(getByRole("img")).toBeInTheDocument();
  });
});
