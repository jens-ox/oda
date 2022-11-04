import Document, { Html, Main, Head, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
