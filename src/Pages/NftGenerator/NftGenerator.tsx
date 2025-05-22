/// <reference types="vite/client" />
import { useEffect, useState } from "react";
import Main, { HeadMeta } from "../Main";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import { Link, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSessionObject } from "../../Layouts/UseSessionArray";
import { useNotification } from "../../Layouts/Toast";
import NFTTabs from "./NFTTabs";
import api from "../../Types/api";

import TopBack from "../../Components/TopBack";
import NftAnimation from "../../Components/NftAnimation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GenerateRandomImageBase64 } from "../../Components/ImageGenerator";
import { useWallet } from "@suiet/wallet-kit";
import { Transaction } from "@mysten/sui/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

export default function NftGenerator() {
  const wallet = useWallet();
  const rpcUrl = getFullnodeUrl("testnet");
  const client = new SuiClient({ url: rpcUrl });

  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const urlPrompt = searchParams.get("prompt") || "";
  const generateUrl = searchParams.get("generate") || false;

  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useSessionObject("nftData", {
    prompt: decodeURIComponent(urlPrompt),
    style: "",
  });
  const [speed, setSpeed] = useState(5000);
  const [showStyles, setShowStyles] = useState(false);
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setShowCaptcha] = useState(false);

  const [step, setStep] = useState(0);

  const stepsData = [
    {
      index: 0,
      id: "idle",
      label: "",
      isActive: true,
    },
    {
      index: 1,
      id: "switching_chain",
      label: "Switching to Sui network",
      isActive: true,
    },
    {
      index: 2,
      id: "waiting_confirm",
      label: "Waiting approve in wallet",
      isActive: true,
    },
    {
      index: 3,
      id: "pending_transaction",
      label: "Waiting for transaction confirmation",
      isActive: true,
    },
    { index: 4, id: "waiting_api", label: "Generating NFT", isActive: true },
  ];

  // Fetch styles
  const { data: styleData } = useQuery({
    queryKey: ["styles"],
    queryFn: () => api.get("/styleList").then((res) => res.data),
    staleTime: Infinity,
  });

  // NFT Generation Query
  const {
    data: imgRes,
    refetch: generateNFT,
    isFetching,
  } = useQuery({
    queryKey: ["nftImage", data.prompt, data.style],
    queryFn: async () => {
      setSpeed(500);
      if (window.location.hostname === "localhost") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return GenerateRandomImageBase64(400, 400).replace(
          "data:image/png;base64,",
          ""
        );
      }
      const res = await api.post("/image_generation_v2", data);
      return res.data.base64_image;
    },
    enabled: false,
    gcTime: Infinity,
    onSuccess: () => {
      setSpeed(5000);
      setStep(0);
      setLoading(false);
      setShowCaptcha(false);
    },
    onError: (err: any) => {
      setStep(0);
      console.log("Fetch SendMessage:", err);
      setLoading(false);
      setSpeed(5000);
    },
  });

  useEffect(() => {
    if (isFetching) {
      setSpeed(500);
    } else {
      setSpeed(5000);
    }
  }, [isFetching]);

  useEffect(() => {
    if (styleData) setStyles(styleData);
    if (urlPrompt?.length > 2) {
      setData({ style: "", prompt: urlPrompt });
    }
    if (generateUrl === "true") {
      queryClient.setQueryData(["nftImage", data.prompt, data.style], null);
    }
  }, [styleData, urlPrompt, generateUrl]);

  const ShowCaptcha = () => {
    ClearImage();
    if (!wallet.connected) {
      showNotification("Please connect wallet first.", "e", darkMode, 5000);
      return;
    }
    if (!data.prompt || data.prompt.length === 0) {
      showNotification("Please write a prompt.", "e", darkMode, 5000);
      return;
    }
    if (data.prompt.length < 3 || data.prompt.length > 2000) {
      showNotification(
        "Prompt length must between 3 and 2000 characters.",
        "e",
        darkMode,
        5000
      );
      return;
    }
    PayForGenerate();
  };

  const PayForGenerate = async () => {
    if (!wallet.chain?.id.includes("testnet")) {
      showNotification("Please switch to Sui testnet!", "error");
      return;
    }

    const userAddress = wallet.address;
    if (!userAddress) {
      showNotification("Wallet not connected!", "error");
      return;
    }

    try {
      setStep(2);
      const tx = new Transaction();
      tx.moveCall({
        target:
          "0xab8cc8ff2a5b65a69b2a8748d0485d4d2917f6d0d5b8da4391a6a3904422af6::nft_factory::create_and_mint_collection",
        arguments: [
          tx.object(
            "0x0791cbcaf833b59ec611aad25a16abf90a0f52c0c7d4c0911376eb6c76c6292d"
          ),
          tx.pure.string("Name"),
          tx.pure.string("Description"),
          tx.pure.string("ipfs"),
          tx.pure.u64(1),
        ],
      });

      tx.setGasBudget(1_000_000_000);
      const res = await wallet.signAndExecuteTransaction({
        transaction: tx,
      });
      setStep(3);
      const txn = await client.waitForTransaction({
        digest: res.digest,
        options: { showEffects: true },
      });

      if (txn.effects?.status.status === "success") {
        showNotification("Payment successful!", "success");
        setStep(4);
        generateNFT();
      } else {
        setStep(0);
        showNotification("Transaction failed", "error");
      }
    } catch (error) {
      setStep(0);
      console.error("Error:", error);
      showNotification(
        `Failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "error"
      );
    }
  };

  const SetStyle = (item: string) => {
    setData({ ...data, style: item });
    setShowStyles(false);
  };

  const ClearImage = () => {
    setStep(0);
    queryClient.setQueryData(["nftImage", data.prompt, data.style], null);
    setData({ prompt: "", style: "" });
    setSpeed(5000);
    setLoading(false);
  };

  return (
    <Main showFooter={false} setDark={setDarkMode}>
      <HeadMeta title={"NGT Generator"} />
      <TopBack />

      {imgRes == null || imgRes.length < 20 ? (
        <div className="relative z-10 min-h-screen">
          <section className="">
            <div className="container mx-auto flex justify-center items-center mb-8">
              <div
                className={`nft-loader transition-all duration-[1000ms] ${
                  imgRes != null && imgRes.length > 20
                    ? "opacity-0 scale-0 absolute"
                    : "opacity-100 scale-100"
                }`}
              >
                <NftAnimation speed={speed} />
              </div>
            </div>
          </section>

          {/* Prompt */}
          {step == 0 ? (
            <section className="relative">
              {/* input */}
              <div className="container mx-auto mb-4">
                <div className="flex gap-x-4 bg-nft-color py-4 px-4 rounded-md items-center mx-32 bg-gray-200">
                  <div className="relative rounded-md bg-white h-[48px] flex items-center justify-center">
                    <div
                      className="flex items-center justify-center px-3 gap-x-1 cursor-pointer"
                      onClick={() => setShowStyles(!showStyles)}
                    >
                      <span>
                        {data.style !== null && data.style.length > 2
                          ? data.style
                          : "Choose Style"}
                      </span>
                      <Icon
                        icon="ep:arrow-up-bold"
                        className="w-p h-p"
                        flip={showStyles ? "vertical" : ""}
                      />
                    </div>
                    {showStyles && (
                      <div className="absolute -top-12 flex gap-x-2 left-0">
                        {styles.map((item, index) => (
                          <div
                            key={index}
                            className={`rounded-md border border-gray-600 flex gap-x-2 py-1 px-2 items-center cursor-pointer hover:bg-nft-color text-main-text ${
                              data.style == item && "bg-nft-color"
                            }`}
                            onClick={() => SetStyle(item)}
                          >
                            <p className="text-sm">{item}</p>
                            {/* <img src={Logo} alt="" className="w-6 h-6" /> */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Prompt"
                      onChange={(e) =>
                        setData({ ...data, prompt: e.target.value })
                      }
                      className="rounded-md bg-white !text-black"
                      value={data.prompt}
                    />
                  </div>
                  <div>
                    <Button
                      label="Generate"
                      onClick={ShowCaptcha}
                      className="rounded-md cursor-pointer"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
              {/* bottom cap */}
              <div>
                <p className="text-center text-main-text">
                  No idea? use our{" "}
                  <Link
                    type="l"
                    to={"/ai-assist"}
                    className="px-2 rounded-full inline-block text-(--primary) font-bold underline"
                  >
                    AI Assist
                  </Link>
                  for brain storming
                </p>
              </div>
            </section>
          ) : (
            <div className="w-[380px] mx-auto mt-20  bg-(--footer-light) p-2 rounded-2xl">
              {stepsData.map(
                (item: any) =>
                  item.index != 0 && (
                    <div className="mb-2 flex gap-x-4" key={item.index}>
                      <div
                        className={`w-6 h-6 rounded-full  text-white text-center text-sm pt-[2px] ${
                          item.index < step
                            ? "bg-green-600"
                            : item.index == step
                            ? "bg-(--primary) font-bold"
                            : "bg-gray-400"
                        }`}
                      >
                        {item.index}
                      </div>
                      <p
                        className={` text-primary ${
                          item.index < step
                            ? "text-green-600"
                            : item.index == step
                            ? "text-(--primary) font-bold"
                            : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      ) : (
        <section className="relative flex flex-col items-center z-10">
          {/* Image */}
          <div className="max-w-[500px] relative">
            <img
              src={`data:image/png;base64, ${imgRes}`}
              className={`z-10 w-full  h-auto rounded-md transition-all duration-[1500ms] ${
                imgRes == null || imgRes.length < 20
                  ? "opacity-0 scale-0"
                  : "opacity-100 scale-100"
              }`}
            />
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
                onClick={ClearImage}
              >
                <Icon icon="famicons:arrow-back-outline" className="w-6 h-6" />
              </div>
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer"
                onClick={ShowCaptcha}
              >
                <Icon
                  icon="material-symbols:refresh-rounded"
                  className="w-6 h-6 scale-x-[-1]"
                />
              </div>
            </div>
          </div>
          {/* nft Details */}
          <NFTTabs
            base64Image={imgRes}
            setBase64Image={(value: any) =>
              queryClient.setQueryData(
                ["nftImage", data.prompt, data.style],
                value
              )
            }
            darkMode={false}
            setPrompt={setData}
            setStep={setStep}
          />
        </section>
      )}
    </Main>
  );
}
