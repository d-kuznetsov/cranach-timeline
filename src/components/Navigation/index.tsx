import { useRouter } from "next/router";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import GridOnIcon from "@material-ui/icons/GridOn";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import styles from "./Navigation.module.scss";

interface navAction {
  label: string;
  link: string;
  IconComponent: OverridableComponent<SvgIconTypeMap<{}, any>>;
}

export const navItems: Array<navAction> = [
  { label: "Home", IconComponent: HomeIcon, link: "/" },
  { label: "Timeline", IconComponent: TimelineIcon, link: "/timeline" },
  { label: "Grid", IconComponent: GridOnIcon, link: "/grid" },
  { label: "Contact", IconComponent: ContactMailIcon, link: "/contact" },
];

export function NavigationContainer() {
  const router = useRouter();
  const handleLinkChange = (e: React.ChangeEvent<{}>, link: string) => {
    router.push(link);
  };
  return (
    <NavigationComponent items={navItems} link={router.pathname} onChange={handleLinkChange} />
  );
}

interface Props {
  items: Array<navAction>;
  link: string;
  onChange: (e: React.ChangeEvent<{}>, value: string) => void;
}

export function NavigationComponent({ items, link, onChange }: Props) {
  return (
    <BottomNavigation
      classes={{ root: styles["navigation-root"] }}
      value={link}
      onChange={onChange}
    >
      {items.map(({ label, link, IconComponent }) => {
        return (
          <BottomNavigationAction
            classes={{
              wrapper: styles["action-wrapper"],
              selected: styles["action-selected"],
            }}
            key={label}
            label={label}
            value={link}
            icon={<IconComponent />}
            showLabel={true}
          ></BottomNavigationAction>
        );
      })}
    </BottomNavigation>
  );
}
