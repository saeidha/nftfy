import { ChangeEvent, useEffect, useState } from "react";
import Main, { HeadMeta } from "../Main";
import Input from "../../Components/Input";
import BuyNFT from "./BuyNFT";
// import { usePublicClient, useReadContract } from "wagmi";
import { NftType } from "../../Types/Types";
import Logo from "../../assets/images/logo.png";
import { useParams } from "react-router-dom";
import { abi } from "../../Types/abiFactory";
import { noImageBase64 } from "../../Types/noImage";
import TopBack from "../../Components/TopBack";
import MySelect from "../../Components/MySelect";
// import { useAbstractClient } from "@abstract-foundation/agw-react";

export default function MarketPlace() {
  const { nftId } = useParams();

  // const { data: agwClient } = useAbstractClient();
  // const publicClient = usePublicClient();
  
  const [openModal, setOpenModal] = useState(true);
  const [selectNft, setSelectNft] = useState<NftType>();
  const [data, setData] = useState({
    prompt: "",
    sort: "newest",
  });
  const [collections, setCollections] = useState<NftType[]>([]);
  const [firstCollections, setFirstCollection] = useState<NftType[]>([]);
  const [countdowns, setCountdowns] = useState<{ id: string; date: string }[]>(
    []
  );
  const [imageBlobs, setImageBlobs] = useState<{ [key: string]: string }>({});

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // const result = useReadContract({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "getAvailableCollectionsToMintDetails",
  //   args: agwClient ? [agwClient.account.address] : [],
  // });

  // useEffect(() => {
  //   if (result.isSuccess) {
  //     FetchMarketPlaceData([...result.data]);
  //   }
  // }, [result.isSuccess]);

  const SearchNft = (e: ChangeEvent<HTMLInputElement>) => {
    let nfts = firstCollections;
    if (e.target.value.length > 0) {
      nfts = nfts.filter((x) =>
        x.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    switch (data.sort) {
      case "lth":
        nfts = nfts.sort((a, b) => Number(a.mintPrice) - Number(b.mintPrice));
        break;
      case "htl":
        nfts = nfts.sort((a, b) => Number(b.mintPrice) - Number(a.mintPrice));
        break;
      case "new":
        break;
    }
    setCollections(nfts);
    setData({ ...data, prompt: e.target.value });
  };

  const OpenModal = (nft: any) => {
    setSelectNft(nft);
    setOpenModal(true);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(!publicClient) return;
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
    const offers = items.map((offer, index) => ({
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
      maxSupply: Number(offer.maxSupply), // Convert count to number
      tokenIdCounter: Number(offer.tokenIdCounter),
      maxTime: Number(offer.maxTime),
      mintPerWallet: offer.mintPerWallet,
      mintPrice: offer.mintPrice.toString(),
      actualPrice: offer.actualPrice.toString(),
      isDisable: offer.isDisable,
      isUltimateMintTime: offer.isUltimateMintTime,
      isUltimateMintQuantity: offer.isUltimateMintQuantity,
      date: new Date().toISOString(),
      hour: new Date().getHours().toString(),
      remaining: Number(offer.maxSupply) - Number(offer.tokenIdCounter),
    }));
    const reversedOffers = offers.reverse();
    setCollections(reversedOffers);
    setFirstCollection(reversedOffers);
  };

  useEffect(() => {
    if (nftId && nftId != undefined && collections.length > 0) {
      ReadNft();
    }
    collections.forEach((nft) => {
      if (!imageBlobs[nft.collectionAddress]) {
        DownloadImage(nft.baseImageURI, nft.collectionAddress);
      }
    });
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000 * 60);
    return () => clearInterval(interval);
  }, [collections]);

  const DownloadImage = async (ipfsUrl: string, id: string) => {
    try {
      if (ipfsUrl.startsWith("https") || ipfsUrl.startsWith("http")) {
        const response = await fetch(ipfsUrl);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);
        setImageBlobs((prev) => ({
          ...prev,
          [id]: base64,
        }));
      } else {
        let download = await fetch("https://ipfs.io/ipfs/" + ipfsUrl);
        const blob = await download.blob();
        const base64 = await convertBlobToBase64(blob);
        setImageBlobs((prev) => ({
          ...prev,
          [id]: base64,
        }));
      }
    } catch (error) {
      setImageBlobs((prev) => ({
        ...prev,
        [id]: noImageBase64,
      }));
      console.error(`Failed to download image ${id}:`, error);
    }
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
      const maxTimeMs =
        Number(nft.maxTime) * (nft.maxTime < 1_000_000_000_000 ? 1000 : 1);
      const timeDiff = maxTimeMs - now;
      if (nft.isUltimateMintTime) {
        return { id: nft.collectionAddress, date: `Unlimited` };
      }
      if (timeDiff <= 0) {
        return { id: nft.collectionAddress, date: `Expired` };
      }
      const days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(
        0,
        Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );

      return { id: nft.collectionAddress, date: `${days}d ${hours}h` };
    });
    setCountdowns(updatedCountdowns);
  };

  const ReadNft = async () => {
    let nft = collections.find((x) => {
      return x.baseImageURI === nftId;
    });
    setSelectNft(nft);
    setOpenModal(true);
  };

  const ChangeSort = (value: string) => {
    switch (value) {
      case "lth":
        setCollections(
          [...collections].sort(
            (a, b) => Number(a.mintPrice) - Number(b.mintPrice)
          )
        );
        break;
      case "htl":
        setCollections(
          [...collections].sort(
            (a, b) => Number(b.mintPrice) - Number(a.mintPrice)
          )
        );
        break;
      case "new":
        setCollections(
          [...collections].sort((a, b) => Number(b.id) - Number(a.id))
        );
        break;
      case "remain":
        setCollections(
          [...collections].sort((a, b) => a.remaining - b.remaining)
        );
        break;
      case "exp":
        setCollections([...collections].sort((a, b) => a.maxTime - b.maxTime));
        break;
    }
    setData({ ...data, sort: value });
  };

  const options = [
    { label: "Newest", value: "new" },
    { label: "Price Low to High", value: "lth" },
    { label: "Price Hight to Low", value: "htl" },
    { label: "Remaining", value: "remain" },
    { label: "Expiry Time", value: "exp" },
  ];

  return (
    <Main showFooter={false}>
      <HeadMeta title={"NFT Generator"} />
      <TopBack />

      <section className="relative z-10 min-h-screen">
        <div className="container mx-auto px-5">
          <div className="flex justify-center items-center gap-x-2 mb-8 max-w-[700px] mx-auto">
            <Input
              className="bg-transparent text-white placeholder-gray-300 ring-(--primary) flex-1"
              parentClass="border-(--primary) flex-1"
              onChange={(e) => SearchNft(e)}
              isSearch={true}
            />
            <MySelect
              options={options}
              onChange={(value) => ChangeSort(value)}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {collections.map((item, index) => {
              const countdown = countdowns.find(
                (c) => c.id === item.collectionAddress
              ) || { id: item.collectionAddress, date: "0d 0h" };
              return (
                <div
                  className="relative z-10 rounded-md overflow-hidden group transition-all duration-300 cursor-pointer border border-(--primary)/20"
                  key={index}
                  onClick={() => OpenModal(item)}
                >
                  {imageBlobs[item.collectionAddress] ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={imageBlobs[item.collectionAddress]}
                        alt=""
                        className="rounded-tr-md rounded-tl-md w-full object-cover h-60"
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
                      <img src={Logo} alt="" className="w-6 h-6 animate-ping" />
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {openModal && selectNft && (
        <BuyNFT
          nft={selectNft}
          setNft={setSelectNft}
          setOpenModal={setOpenModal}
          image={imageBlobs[selectNft.collectionAddress]}
          setCollections={setCollections}
        />
      )}
    </Main>
  );
}
