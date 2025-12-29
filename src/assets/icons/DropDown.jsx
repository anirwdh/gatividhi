import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={15}
    height={8}
    viewBox="0 0 15 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.749218 0.749999L6.18255 6.18333C6.82422 6.825 7.87422 6.825 8.51588 6.18333L13.9492 0.75"
      stroke="Black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
