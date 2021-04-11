import memoize from "memoize-one";

const setCssPrimaryColor = memoize((color: string) => {
  document?.documentElement.style.setProperty("--color-primary", color);
});

export { setCssPrimaryColor };
