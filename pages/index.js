import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import Date from "../components/Date";
import { waitForServer } from "../helpers";

const Home = ({ date }) => {
  const [loadTime, setLoadTime] = useState(0);
  const paths = ["matt", "eric", "riley"];

  useEffect(() => {
    const loadingTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;

    setLoadTime(loadingTime);
  }, []);

  return (
    <div>
      <Date date={date} loadTime={loadTime} />
      <div>
        {paths.map((slug) => {
          return (
            <div key={slug}>
              <h2>{slug}</h2>
              <Link href="/post/[slug]" as={`/post/${slug}`}>
                <a>Go here</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  // const entries = await client.getEntries({
  //   content_type: "blogPost",
  // });
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");
  await waitForServer(250);

  return {
    props: { date },
  };
};

export default Home;
