import App, { AppProps, AppContext } from "next/app";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Cookies from "cookies";
import { createReduxStore } from "../redux/store";
import { Categories, Period, ColorPalette, RootState } from "../redux/types";
import setCookie from "../lib/setCookie";
import { setCssPrimaryColor } from "../lib/cssColors";
import "../styles/base.scss";
import "fontsource-roboto";

interface UserSettings {
  period?: Period;
  categories?: Categories;
  lineHeight?: number;
  colorPalette?: ColorPalette;
}
interface MyAppProps extends AppProps {
  userSettings: UserSettings;
}

const cookieNames = ["period", "categories", "lineHeight", "colorPalette"];

export default function MyApp({ Component, pageProps, userSettings = {} }: MyAppProps) {
  const [store] = useState(createReduxStore(userSettings));
  useEffect(() => {
    setCssPrimaryColor(extractPrimaryColor(store.getState()));
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      setCookies(state);
      setCssPrimaryColor(extractPrimaryColor(state));
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

function setCookies(state: RootState) {
  cookieNames.forEach((name) => {
    // @ts-ignore
    setCookie(name, state[name]);
  });
}

function getUserSettings(appCtx: AppContext) {
  let userSettings: UserSettings = {};
  const { req, res } = appCtx.ctx;

  if (req && res) {
    const cookies = new Cookies(req, res);
    cookieNames.forEach((name) => {
      const value = cookies.get(name);
      if (value) {
        // @ts-ignore
        userSettings[name] = JSON.parse(decodeURIComponent(value));
      }
    });
  }
  return userSettings;
}

function extractPrimaryColor(state: RootState) {
  return state.colorPalette.primary.main;
}
