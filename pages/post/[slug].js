import { useState, useEffect } from "react";
import { client } from "../../lib/contentful";
import marked from "marked";
import moment from "moment";
import Date from "../../components/Date";
import { waitForServer } from "../../helpers";

const BlogPost = ({ date, entry }) => {
  const [loadTime, setLoadTime] = useState(0);
  useEffect(() => {
    const loadingTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;

    setLoadTime(loadingTime);
  }, []);

  const { author, body, description, heroImage, title } = entry.items[0].fields;
  const imgUrl = heroImage.fields.file.url;
  return (
    <div>
      <Date date={date} loadTime={loadTime} />
      <h1>{title}</h1>
      <img src={imgUrl} width="100%" />
      <div dangerouslySetInnerHTML={{ __html: marked(body) }}></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const entries = await client.getEntries({
    content_type: "blogPost",
  });

  const paths = entries.items.map((entry) => {
    const { slug } = entry.fields;

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");

  const entry = await client.getEntries({
    content_type: "blogPost",
    "fields.slug[in]": slug,
  });

  await waitForServer(250);

  return { props: { entry, date }, unstable_revalidate: 60 };
};

export default BlogPost;
