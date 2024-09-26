import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="min-h-screen flex-center-center">
      <ImSpinner2 className="animate-spin text-4xl text-brand" />
    </div>
  );
};

export default Loading;
