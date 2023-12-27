interface OfferCardProps {
  icon: any;
  title: string;
  description: string;
}

const OfferCard = ({ icon: Icon, title, description }: OfferCardProps) => {
  return (
    <div className="relative group max-w-3xl h-[200px] border border-1 rounded-xl flex flex-col justify-center items-start p-2 gap-y-4 cursor-pointer">
      <Icon className="w-10 h-10 text-purple-500 " />
      <div className="font-semibold tracking-tight">{title}</div>
      <div className="opacity-60 text-sm">{description}</div>
      <div className="-z-10 absolute opacity-0 inset-x-1 bg-purple-500/40 blur-3xl mx-auto h-[100px] w-[150px] md:w-[300px]  group-hover:block group-hover:opacity-100 transition-all duration-500" />
    </div>
  );
};

export default OfferCard;
