import { useState, useEffect } from "react";
import marked from "marked";
import moment from "moment";
import Date from "../../components/Date";
import { waitForServer } from "../../helpers";

const BlogPost = ({ date, slug }) => {
  const [loadTime, setLoadTime] = useState(0);
  useEffect(() => {
    const loadingTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;

    setLoadTime(loadingTime);
  }, []);

  // const { author, body, description, heroImage, title } = entry.items[0].fields;
  // const imgUrl = heroImage.fields.file.url;
  return (
    <div>
      <Date date={date} loadTime={loadTime} />
      <h1>{slug}</h1>
    </div>
  );
};

export const getStaticPaths = async () => {
  // const entries = await client.getEntries({
  //   content_type: "blogPost",
  // });

  const names = ["matt", "eric", "riley"];

  // const paths = names.map((entry) => {
  //   // const { slug } = entry.fields;

  //   return {
  //     params: { entry },
  //   };
  // });

  return {
    paths: [
      { params: { slug: "matt" } },
      { params: { slug: "eric" } },
      { params: { slug: "riley" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");

  // const entry = await client.getEntries({
  //   content_type: "blogPost",
  //   "fields.slug[in]": slug,
  // });

  await waitForServer(250);

  return { props: { date, slug } };
};

export default BlogPost;
