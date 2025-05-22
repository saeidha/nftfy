import logo from "../assets/images/logo.png";

interface AIModelLoadingProps {
  speed?: number;
}

const NftAnimation: React.FC<AIModelLoadingProps> = ({ speed = 5000 }) => {
  return (
    <div className="flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-60 h-60 flex items-center justify-center">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-b-4 border-blue-500 border-opacity-50 animate-ping transition-animation duration-100"
            style={{
              animationDuration: `${speed}ms`,
              animationTimingFunction: "linear",
              transition: "animation-duration 0.5s ease",
            }}
          ></div>
          <div
            className="animate-pulse"
            style={{ animationDuration: `${speed}ms` }}
          >
            <img
              src={logo}
              alt="Loading Logo"
              className="rounded-full w-48 h-48"
            />
          </div>
          {/* <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-blue-500"></div> */}
        </div>
      </div>
    </div>
  );
};

export default NftAnimation;
