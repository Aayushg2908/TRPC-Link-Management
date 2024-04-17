import { Group, LayoutDashboardIcon, Globe, Link } from "lucide-react";
import OfferCard from "./_components/OfferCard";
import LoginButton from "@/components/LoginButton";

const features = [
  {
    icon: Group,
    title: "Group Management",
    description:
      "You can create, update, delete, pin links. You can even upload images to make them look fancy. You can also move them to different custom groups for better organization.",
  },
  {
    icon: LayoutDashboardIcon,
    title: "Dashboard",
    description:
      "Immerse yourself in a visually stunning dashboard that not only looks great but works flawlessly. Experience a powerful, reliable interface that simplifies link management.",
  },
  {
    icon: Globe,
    title: "URL Shortener",
    description:
      "Struggling to manage very large URLs? Our URL shortener allows you to shorten long URLs into short, easy-to-remember links.",
  },
  {
    icon: Link,
    title: "Pin Links for Quick Access",
    description:
      "Whether it's essential work resources or your favorite leisure sites, pinning links allows you to keep them within arms reach.",
  },
];

const MarketingPage = () => {
  return (
    <>
      <div className="relative mt-20 sm:mt-32 flex items-center justify-center flex-col">
        <div className="flex items-center justify-center flex-col">
          <div className="font-bold text-5xl sm:text-6xl md:text-7xl text-center tracking-tighter">
            Your ultimate link
          </div>
          <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-purple-500 tracking-tight rounded-md mb-4">
            Organization tool
          </span>
        </div>
        <div className="text-sm sm:text-lg md:text-lg opacity-90 text-neutral-400 mt-4 max-w-lg sm:max-w-xl md:max-w-2xl text-center mx-auto">
          Tired of drowning in a sea of scattered bookmarks? Say goodbye to link
          chaos and hello to seamless link organization.
        </div>
        <LoginButton title="Start Now" size="lg" className="mt-6" />
        <div className="-z-10 absolute m-auto h-[360px] w-[360px] opacity-40 bg-purple-500/60 blur-3xl rounded-full md:h-[450px] md:w-[500px]" />
      </div>
      <div className="w-full mt-20 flex flex-col">
        <div className="mx-auto flex flex-col items-center">
          <div className="text-3xl font-bold">What we offer</div>
          <div className="mt-1 opacity-70">
            List of features our application offers.
          </div>
        </div>
        <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <OfferCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <div className="mx-auto mb-4">
          <LoginButton title="Start Now" size="lg" className="mt-6" />
        </div>
      </div>
    </>
  );
};

export default MarketingPage;
