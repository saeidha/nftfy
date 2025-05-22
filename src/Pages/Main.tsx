import React, { useEffect, useState } from "react";
import Header from "./Common/Header";
import { Helmet } from "react-helmet";
import Logo from "../assets/images/logo.png";
import Footer from "./Common/Footer";

export default function Main({
  children,
  setDark = () => {},
  showFooter = true,
}: {
  children: React.ReactNode;
  setDark?: React.Dispatch<React.SetStateAction<boolean>>;
  showFooter: boolean;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let savedMode = localStorage.getItem("displayMode");
    if (!savedMode) {
      savedMode = "dark";
      setDarkMode(false);
      localStorage.setItem("displayMode", savedMode);
    }
    setDarkMode(savedMode == "dark" ? true : false);
    setDark(savedMode == "dark" ? true : false);
  }, []);

  // const ToggleDarkMode = () => {
  //   let savedMode = localStorage.getItem("displayMode");
  //   setDarkMode(!darkMode);
  //   localStorage.setItem(
  //     "displayMode",
  //     savedMode == "light" ? "dark" : "light"
  //   );
  //   setDark(!darkMode);

  //   document.documentElement.classList.toggle("dark");
  // };

  return (
    <div className={`w-full bg-background ${darkMode ? "dark" : "light"}`}>
      <Header />
      <div className="py-10 min-h-full w-full">{children}</div>
      {showFooter && <Footer />}
    </div>
  );
}

interface HeadMetaProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  name?: string;
}

export function HeadMeta({
  title,
  description = "",
  keywords = "",
  image = "",
  name = "",
}: HeadMetaProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title} - Sui</title>
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph tags (OG) */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* OG image tags */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:alt" content={`Image of ${title} site`} />
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/*  */}
      <link rel="shortcut icon" type="image/png" href={Logo} />
      <link rel="shortcut icon" sizes="192x192" href={Logo} />
      <link rel="apple-touch-icon" href={Logo} />
      <link rel="canonical" href={window.location.href} />
      <script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="IewggEkQM8nC3XqMnwVRQQ"
        async
      ></script>
    </Helmet>
  );
}
