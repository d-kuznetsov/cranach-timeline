import PropTypes from "prop-types";
import "../styles.scss";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};
