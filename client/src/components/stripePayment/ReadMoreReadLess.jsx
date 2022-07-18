import React, { useState } from "react";

const ReadMoreReadLess = ({ children }) => {
  const [readMore, setReadMore] = useState(false);
  const text = children;

  const toggleText = () => {
    setReadMore(prevState => !prevState);
  };
  return (
    <div className="small-text mt-3">
      {readMore ? text : text.substr(0, 100)}
      <p onClick={toggleText}>
        {" "}
        {readMore ? (
          <b className="pointer"> Read Less</b>
        ) : (
          <b className="pointer"> Read More</b>
        )}
      </p>
    </div>
  );
};

export default ReadMoreReadLess;
