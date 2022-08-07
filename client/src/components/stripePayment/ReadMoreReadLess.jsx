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
          <small className="fw-bold"> Read Less</small>
        ) : (
          <small className="fw-bold"> Read More</small>
        )}
      </p>
    </div>
  );
};

export default ReadMoreReadLess;
