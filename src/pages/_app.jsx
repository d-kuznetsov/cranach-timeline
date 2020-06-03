import { useState } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { createReduxStore } from "../redux/store";
import "../styles/base.scss";

export default function App({ Component, pageProps }) {
  const [store] = useState(createReduxStore());
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};
