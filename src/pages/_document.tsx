import Document from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

class MyDocument extends Document {
  // @ts-ignore
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </>
      ),
    };
  }
}

export default MyDocument;
