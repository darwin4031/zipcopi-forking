import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.fbAsyncInit = function() {
          FB.init({
            appId      : '279330217014932',
            cookie     : true,
            xfbml      : true,
            version    : 'v10.0'
          });

          FB.AppEvents.logPageView();

        };

          (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
`,
            }}
          />
        </Head>
        <body>
          <Main />
          <div id="modalRoot" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
