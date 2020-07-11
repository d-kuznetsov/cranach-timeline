import { mount } from "enzyme";
import { CategoryComponent as Categories } from "./index";

describe("Caregories", () => {
  const id = 1;
  const displayed = false;
  const categories = {
    1: {
      id,
      label: "label",
      mainColor: "green",
      displayed: false,
    },
  };

  test("event.target.name should be equal category id ", () => {
    const handleChange = (e) => {
      expect(+e.target.name).toBe(id);
    };

    const wrapper = mount(<Categories categories={categories} onChange={handleChange} />);
    wrapper.find("input").simulate("change");
    wrapper.unmount();
  });

  test("event.target.checked should be opposite to category.displayd", () => {
    const handleChange = (e) => {
      expect(e.target.checked).toBe(!displayed);
    };

    const wrapper = mount(<Categories categories={categories} onChange={handleChange} />);
    wrapper.find("input").simulate("change", { target: { checked: !displayed } });
    wrapper.unmount();
  });
});
