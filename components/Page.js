import Head from "next/head";
import { Layout } from "antd";

export default function Page({
  children,
  title="Challenge Doctor",
  description="Challenge Doctor - Agenda citas medicas a cualquier hora del dia."
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="challengedoctor.io" />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </Layout>
  );
}
