import LoadingDots from "./LoadingDots";

const Loader = () => {
  return (
    <div className="fixed z-31 top-0 h-full w-full p-4 shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
      <LoadingDots />
  Loading...
    </div>
  );
};

export default Loader;
