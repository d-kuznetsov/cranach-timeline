import { useSelector, useDispatch } from "react-redux";
import { setCurrentLink } from "../../redux/actions";

import PropTypes from "prop-types";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import InfoIcon from "@material-ui/icons/Info";

const navItems = [
  { label: "Home", IconComponent: HomeIcon, link: "/" },
  { label: "Contact", IconComponent: ContactMailIcon, link: "/contact" },
  { label: "About", IconComponent: InfoIcon, link: "/about" },
];

export function NavigationContainer() {
  const link = useSelector((state) => state.link);
  const dispatch = useDispatch();
  const handleLinkChange = (e, link) => {
    dispatch(setCurrentLink(link));
  };
  return <NavigationComponent items={navItems} link={link} onChange={handleLinkChange} />;
}

export function NavigationComponent({ items, link, onChange }) {
  return (
    <BottomNavigation value={link} onChange={onChange}>
      {items.map(({ label, link, IconComponent }) => {
        return (
          <BottomNavigationAction
            key={label}
            label={label}
            value={link}
            icon={<IconComponent />}
          ></BottomNavigationAction>
        );
      })}
    </BottomNavigation>
  );
}

NavigationComponent.propTypes = {
  items: PropTypes.array,
  link: PropTypes.string,
  onChange: PropTypes.func,
};
