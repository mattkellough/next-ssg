import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../lib/contentful";
import moment from "moment";
import Date from "../components/Date";
import { waitForServer } from "../helpers";

const Home = ({ date, allPosts }) => {
  const [loadTime, setLoadTime] = useState(0);

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
        {allPosts.map(({ slug, title }) => {
          return (
            <div key={slug}>
              <h2>{title}</h2>
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
  const entries = await client.getEntries({
    content_type: "blogPost",
  });
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");
  await waitForServer(250);

  return {
    props: { allPosts: entries.items.map((e) => e.fields), date },
    unstable_revalidate: 60,
  };
};

export default Home;
