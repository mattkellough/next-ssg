import Link from "next/link";
import { client } from "../lib/contentful";
import moment from "moment";

const Home = ({ date, allPosts }) => (
  <div>
    <Date date={date} />
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

export const getStaticProps = async () => {
  const entries = await client.getEntries({
    content_type: "blogPost",
  });
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");

  return { props: { allPosts: entries.items.map((e) => e.fields), date } };
};

export default Home;
