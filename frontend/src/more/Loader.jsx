// import React from "react";
// import "./Loading.css";

// const Loading = () => {
//   return (
//     <div className="loading">
//       <input type="checkbox" id="check" />
//       <label htmlFor="check">
//         <div className="check-icon"></div>
//       </label>
//     </div>
//   );
// };

// export default Loading;




import React from "react";
import Lottie from "react-lottie";
import "./Loading.css";
import animationData from "../Assets/animations/24151-ecommerce-animation.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="loader">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loading;
