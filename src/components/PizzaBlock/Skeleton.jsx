import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="135" r="125" /> 
    <rect x="0" y="280" rx="15" ry="15" width="280" height="25" /> 
    <rect x="0" y="321" rx="15" ry="15" width="280" height="88" /> 
    <rect x="0" y="431" rx="15" ry="15" width="93" height="30" /> 
    <rect x="125" y="420" rx="30" ry="30" width="150" height="46" />
  </ContentLoader>
)

export default Skeleton