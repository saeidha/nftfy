import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { WalletComponents } from "../../Layouts/WalletComponents";

export default function Header() {
  const headerItem = [
    { label: "AI Assist", link: "/ai-assist" },
    { label: "NFT Generator", link: "/nft-generator" },
    // { label: "Mint Pad", link: "/mint-pad" },
  ];

  return (
    <header className="py-3 px-6 left-0 top-0 right-0 relative z-[9000]">
      <div className="container mx-auto">
        <div className="flex p-2 items-center justify-between">
          <div className="flex items-center gap-x-5">
            <Link to="/">
              <img src={logo} alt="logo" className="w-16" />
            </Link>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center rounded-3xl overflow-hidden">
                {headerItem.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className={`p-3  text-base  ${
                      item.link == window.location.pathname
                        ? "text-(--primary) font-bold"
                        : "text-white hover:text-(--primary)"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 items-center justify-end">
            <WalletComponents />
            {/* <button onClick={login}>Connect with AGW</button> */}
            {/* <WalletComponents /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
