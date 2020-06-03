import { useState } from "react";
import styles from "./Navigation.module.scss";
import Router from "next/router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import InfoIcon from "@material-ui/icons/Info";

const navConfig = [
  { label: "Home", IconComponent: HomeIcon, link: "/home" },
  { label: "Contact", IconComponent: ContactMailIcon, link: "/contact" },
  { label: "About", IconComponent: InfoIcon, link: "/about" },
];

export default function Navigation() {
  const [value, setValue] = useState("/home");
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        Router.push(newValue);
      }}
    >
      {navConfig.map(({ label, link, IconComponent }) => {
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
