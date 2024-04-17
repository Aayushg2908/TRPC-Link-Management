import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full mt-40 flex items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10" />
    </div>
  );
};

export default Loader;
