import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="275" rx="10" ry="10" width="260" height="25" />
    <rect x="0" y="315" rx="10" ry="10" width="260" height="88" />
    <rect x="0" y="415" rx="10" ry="10" width="108" height="45" />
    <rect x="152" y="415" rx="20" ry="20" width="108" height="45" />
  </ContentLoader>
);

export default Skeleton;
