import React from "react";
import Head from "next/head";
import moment from "moment";
import Link from "next/link";

const Layout = ({ date, children }) => {
  return (
    <>
      <Head>
        <title>SSG App - {date}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
        <div>
          <p>Time Rendered: {date}</p>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export const getStaticProps = () => {
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");

  return {
    props: {
      date,
    },
  };
};

export default Layout;
