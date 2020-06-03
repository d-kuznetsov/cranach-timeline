import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentLink } from "../../redux/actions";

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

export function PresentationalComponent({ link, onChange }) {
  const handleLinkChange = (e, link) => {
    onChange(link);
  };
  return (
    <BottomNavigation value={link} onChange={handleLinkChange}>
      {navItems.map(({ label, link, IconComponent }) => {
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

PresentationalComponent.propTypes = {
  link: PropTypes.string,
  onChange: PropTypes.func,
};

export default function Navigation() {
  const link = useSelector((state) => state.link);
  const dispatch = useDispatch();
  const handleLinkChange = (link) => {
    dispatch(setCurrentLink(link));
  };
  return <PresentationalComponent link={link} onChange={handleLinkChange} />;
}
