import Document, {
  DocumentContext,
  Head as NextHead,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    const keywordsArray = [
      "Murat Güney",
      "Murat Guney",
      "mrtgny",
      "Lecture",
      "Planner",
      "School",
      "University",
      "Lesson planner",
      "Course planner",
      "https://github.com/mrtgny",
      "https://muratguney.medium.com",
      "https://www.linkedin.com/in/murat-guney",
    ];

    const keywords = keywordsArray.join(", ");

    return (
      <Html lang="en">
        <NextHead>
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content="Lecture Planner" />
          <meta
            property="og:description"
            content="A simple lecture planner app!"
          />
          <meta property="og:image" content="https://mgshort.link/smwerqLB0F" />
        </NextHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
