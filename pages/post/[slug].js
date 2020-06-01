import React from "react";
import { client } from "../../lib/contentful";
import marked from "marked";
import moment from "moment";
import Date from "../../components/Date";

const BlogPost = ({ date, entry }) => {
  const { author, body, description, heroImage, title } = entry.items[0].fields;
  const imgUrl = heroImage.fields.file.url;
  return (
    <div>
      <Date date={date} />
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

  return { props: { entry, date } };
};

export default BlogPost;
