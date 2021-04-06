import App, { AppProps, AppContext } from "next/app";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Cookies from "cookies";
import { createReduxStore } from "../redux/store";
import { Categories, Period } from "../redux/types";
import setCookie from "../lib/setCookie";
import "../styles/base.scss";
import "fontsource-roboto";

interface UserSettings {
  period?: Period;
  categories?: Categories;
  lineHeight?: number;
}
interface MyAppProps extends AppProps {
  userSettings: UserSettings;
}

export default function MyApp({ Component, pageProps, userSettings = {} }: MyAppProps) {
  const [store] = useState(createReduxStore(userSettings));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      setCookie("period", state.period);
      setCookie("categories", state.categories);
      setCookie("lineHeight", state.lineHeight);
    });

    return unsubscribe;
  }, [0]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const userSettings = getUserSettings(appContext);
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, userSettings };
};

function getUserSettings(appCtx: AppContext) {
  let userSettings: UserSettings = {};
  const { req, res } = appCtx.ctx;

  if (req && res) {
    const cookies = new Cookies(req, res);
    const period = cookies.get("period");
    const categories = cookies.get("categories");
    const lineHeight = cookies.get("lineHeight");

    if (period) {
      userSettings.period = JSON.parse(decodeURIComponent(period));
    }
    if (categories) {
      userSettings.categories = JSON.parse(decodeURIComponent(categories));
    }
    if (lineHeight) {
      userSettings.lineHeight = +decodeURIComponent(lineHeight);
    }
  }
  return userSettings;
}
