import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { NftType } from "../Types/Types";
import { Link } from "react-router-dom";

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  initialSlide: number;
  autoplay: boolean;
  autoplaySpeed: number;
  beforeChange?: (current: number, next: number) => void;
  responsive: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
      infinite?: boolean;
      dots?: boolean;
      initialSlide?: number;
    };
  }[];
  customPaging: (i: number) => JSX.Element;
  appendDots: (dots: React.ReactNode) => JSX.Element;
}

type BlobType = {
  image: string;
  baseImageURI: string;
};

export default function MainNFTSlider() {
  const [collections, setCollections] = useState<NftType[]>([]);
  const [countdowns, setCountdowns] = useState<{ id: string; date: string }[]>(
    []
  );
  const [imageBlobs, setImageBlobs] = useState<BlobType[]>([]);

  // const publicClient = usePublicClient();

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // const result = useReadContract({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "getAvailableCollectionsToMintDetails",
  //   args: account.isConnected ? [account.address!] : [],
  // });

  // useEffect(() => {
  //   if (result.isSuccess) {
  //     FetchMarketPlaceData([...result.data]);
  //   }
  // }, [result.isSuccess]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!publicClient) return;
  //     const offers = await publicClient.readContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: "getAvailableCollectionsToMintDetails",
  //       args: agwClient ? [agwClient.account.address] : [],
  //     });
  //     FetchMarketPlaceData([...offers]);
  //   };
  //   fetchData();
  // }, [agwClient]);

  const FetchMarketPlaceData = async (items: any[]) => {
    const now = new Date().getTime();

    let offers = items
      .map((offer, index) => {
        const maxTimeMs =
          Number(offer.maxTime) *
          (offer.maxTime < 1_000_000_000_000 ? 1000 : 1);

        return {
          id: index,
          collectionAddress: offer.collectionAddress,
          name: offer.name,
          description: offer.description,
          symbol: "ETH",
          price:
            Number(offer.mintPrice ?? 0) / 1e18 < 0.00001
              ? "< 0.00001"
              : (Number(offer.mintPrice ?? 0) / 1e18).toFixed(5).toString(),
          baseImageURI: offer.baseImageURI,
          maxSupply: Number(offer.maxSupply),
          tokenIdCounter: Number(offer.tokenIdCounter),
          maxTime: maxTimeMs,
          mintPerWallet: offer.mintPerWallet,
          mintPrice: offer.mintPrice.toString(),
          actualPrice: offer.actualPrice.toString(),
          isDisable: offer.isDisable,
          isUltimateMintTime: offer.isUltimateMintTime,
          isUltimateMintQuantity: offer.isUltimateMintQuantity,
          date: new Date().toISOString(),
          hour: new Date().getHours().toString(),
          remaining: Number(offer.maxSupply) - Number(offer.tokenIdCounter),
        };
      })
      .filter(
        (nft) =>
          (nft.isUltimateMintTime || nft.maxTime > now) &&
          nft.collectionAddress != import.meta.env.VITE_OG_ADDRESS
      )
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 20);
    setCollections(offers);
  };

  useEffect(() => {
    collections.forEach((nft) => {
      const isExist = imageBlobs.find(
        (blob) => blob.baseImageURI === nft.baseImageURI
      );
      if (!isExist) {
        DownloadImage(nft.baseImageURI);
      }
    });
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000 * 60);
    return () => clearInterval(interval);
  }, [collections]);

  const DownloadImage = async (ipfsUrl: string) => {
    try {
      if (ipfsUrl.startsWith("https") || ipfsUrl.startsWith("http")) {
        const response = await fetch(ipfsUrl);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);
        setImageBlobs((prev) => [
          ...prev,
          { image: base64, baseImageURI: ipfsUrl },
        ]);
      } else {
        let download = await fetch("https://ipfs.io/ipfs/" + ipfsUrl);
        const blob = await download.blob();
        const base64 = await convertBlobToBase64(blob);
        if (typeof base64 === "string") {
          setImageBlobs((prev) => [
            ...prev,
            { image: base64 as string, baseImageURI: ipfsUrl },
          ]);
        }
      }
    } catch (error) {}
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const updateCountdowns = () => {
    const now = new Date().getTime();
    const updatedCountdowns = collections.map((nft) => {
      const timeDiff = nft.maxTime - now;
      if (nft.isUltimateMintTime) {
        return { id: nft.collectionAddress, date: `Unlimited` };
      } else {
        const days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
        const hours = Math.max(
          0,
          Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );

        return { id: nft.collectionAddress, date: `${days}d ${hours}h` };
      }
    });
    setCountdowns(updatedCountdowns);
  };

  const [currentIndex, setCurrentIndex] = useState(1);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [progress, setProgress] = useState(0);
  const autoplaySpeed = 8000; // in milliseconds

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;

      if (width <= 480) setSlidesToShow(1);
      else if (width <= 600) setSlidesToShow(2);
      else if (width <= 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlidesToShow(); // Set initial value
    window.addEventListener("resize", updateSlidesToShow); // Update on resize

    return () => {
      window.removeEventListener("resize", updateSlidesToShow); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) =>
        prev < 100 ? prev + 100 / (autoplaySpeed / 100) : 100
      );
    }, 100);
    return () => clearInterval(interval);
  }, [progress, autoplaySpeed]);

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (_, next) => {
      setProgress(0);
      setCurrentIndex(next);
    },
    customPaging: (i) => {
      const isActive = Math.floor(currentIndex / slidesToShow) === i;
      return (
        <div
          className={`w-20 h-2 rounded-full overflow-hidden  mt-2 bg-transparent`}
        >
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-400 rounded-full">
            <div
              className="h-full bg-(--primary) rounded-full"
              style={{
                width: `${isActive ? progress : 0}%`,
                transition: `width 0.1s linear`,
              }}
            />
          </div>
        </div>
      );
    },
    appendDots: (dots) => (
      <div className="flex justify-center items-center p-0 w-20 rounded-full">
        {dots}
      </div>
    ),
  };

  return (
    <div className="slider-container main-slick">
      <Slider {...settings}>
        {collections.map((item, index) => {
          const countdown = countdowns.find(
            (c) => c.id === item.collectionAddress
          ) || { id: item.collectionAddress, date: "0d 0h" };
          return (
            <div className="px-2">
              <Link
                className="block relative z-10 overflow-hidden group transition-all duration-300 cursor-pointer border border-(--primary)/20 rounded-md"
                key={index}
                to={`/mint-pad/${item.baseImageURI}`}
              >
                {imageBlobs.find(
                  (blob) => blob.baseImageURI === item.baseImageURI
                )?.image ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        imageBlobs.find(
                          (blob) => blob.baseImageURI === item.baseImageURI
                        )?.image
                      }
                      alt=""
                      className="w-full object-cover h-60"
                    />
                    <p
                      className="absolute top-0 bg-(--primary)/50  rounded-br-md left-0 p-2 text-white text-sm"
                      key={item.collectionAddress}
                    >
                      {countdown.date}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-tr-md rounded-tl-md w-full object-cover h-60 bg-gray-600 flex justify-center items-center relative overflow-hidden">
                    <p
                      className="absolute top-0 bg-(--primary)/50 rounded-br-md left-0  p-2 text-white text-sm"
                      key={item.collectionAddress}
                    >
                      {countdown.date}
                    </p>
                  </div>
                )}
                <div className="text-black p-2 border-t border-gray-200">
                  <p className="overflow-hidden text-ellipsis h-[1.8em] leading-[1.8em] line-clamp-1 text-wrap break-words text-left font-bold">
                    {item.name}
                  </p>
                  <p className="mb-2 overflow-hidden text-ellipsis h-[1.8em] leading-[1.8em] line-clamp-1 text-wrap break-words text-left text-gray-500 text-sm">
                    {item.description}
                  </p>
                  <p className="font-bold text-(--primary)">
                    {item.price} {item.symbol}
                  </p>
                  <p className="mb-2">
                    Remaining Mint:
                    {item.isUltimateMintQuantity
                      ? " Unlimited"
                      : ` ${item.remaining} items`}{" "}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
