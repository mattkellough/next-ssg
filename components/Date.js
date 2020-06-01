import React from "react";
import moment from "moment";

const Date = ({ date }) => {
  return (
    <div>
      <p>Time Rendered: {date}</p>
    </div>
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

export default Date;
