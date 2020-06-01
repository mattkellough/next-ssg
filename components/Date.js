const Date = ({ date, loadTime }) => {
  return (
    <div>
      <p>Time Rendered: {date}</p>
      <p>Load Time: {loadTime}ms</p>
    </div>
  );
};

export default Date;
