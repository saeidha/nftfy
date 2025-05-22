import { Link } from "react-router-dom";
import Main, { HeadMeta } from "./Main";
import banner from "../assets/images/index/banner.png";
import { useEffect, useState } from "react";
import MainNFTSlider from "../Layouts/MainNFTSlider";
import TopBack from "../Components/TopBack";
import Lottie from "lottie-react";
import animationData from "../assets/anim.json";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Index() {
  const [, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(localStorage.getItem("displayMode") == "dark" ? true : false);
  }, []);

  return (
    <Main setDark={setDarkMode} showFooter={true}>
      <HeadMeta title="Best AI NFT Maker" />
      {/* Background */}
      <TopBack />
      {/* OG */}
      <section className="relative z-10 mb-20">
        <div className="container mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col justify-center">
              <h1 className="text-6xl font-bold mb-5">
                The first NFT provider in{" "}
                <span className="text-(--primary)">SUI</span>
              </h1>
              <p className="text-lg">
                Meet the our assistant and ask him to help you that write on
                paper you opinions, and let out model create a high-quality NFTs
                for you.
              </p>
              {/* <OGModal /> */}
            </div>
            <div className="flex items-center justify-center">
              <Lottie
                className="w-[600px] h-[600px]"
                animationData={animationData}
                style={{ background: "transparent" }} // Ensure transparent background
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className={`container rounded-3xl mx-auto my-20`}>
        <MainNFTSlider />
      </section> */}
      {/* Generator */}
      <section
        className="relative z-10 mt-10 mb-32 pt-12 h-screen bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="container mx-auto">
          <div className="absolute inset-y-40 inset-x-48 rounded-3xl flex flex-col items-center justify-center bg-gray-600/80  backdrop-blur-xs">
            <h2 className="text-white text-3xl mb-8">
              All style in one Assist.
            </h2>
            <p className="text-gray-200 max-w-[600px] text-center mb-8">
              “Unleash the future of NFTs! 🚀 Our powerful AI agent generates
              unique, high-value digital art instantly. Create, own, and
              profit—effortlessly! 🎨🔥 #NFT #AIArt”
            </p>
            <Link
              to="/nft-generator"
              className="bg-(--primary) text-white rounded-3xl group transition-all duration-300 group flex items-center px-8 py-4 relative"
            >
              Create Your NFT Now
              <Icon
                icon="mingcute:arrow-right-fill"
                className="ml-1 absolute right-5 top-5 translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:inline-block transition-all duration-300"
              />
            </Link>
          </div>
        </div>
      </section>
    </Main>
  );
}
