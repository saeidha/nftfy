import { useState } from "react";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNotification } from "../../Layouts/Toast";
import { pinata } from "../../Types/pinata";
import { useWallet } from "@suiet/wallet-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

interface NFTTabsProps {
  base64Image: string;
  setBase64Image: React.Dispatch<React.SetStateAction<string | null>>;
  darkMode: boolean;
  setPrompt: React.Dispatch<
    React.SetStateAction<{ prompt: string; style: string }>
  >;
  setStep: React.Dispatch<number>;
}

const NFTTabs: React.FC<NFTTabsProps> = ({
  base64Image,
  setBase64Image,
  setPrompt,
  setStep,
}) => {
  const wallet = useWallet();
  const rpcUrl = getFullnodeUrl("testnet");
  const client = new SuiClient({ url: rpcUrl });

  const { showNotification } = useNotification();
  const [data, setData] = useState({
    name: "",
    description: "",
    symbol: "ETH",
    imageURL: "",
    maxSupply: null,
    date: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    hours: "00:00",
    maxTime: null,
    mintPerWallet: true,
    mintPrice: null,
    IsUltimateMintTime: true,
    IsUltimateMintQuantity: true,
  });
  const [showMintSuccess, setShowMintSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const UploadImage = async () => {
    try {
      setIsUpload(true);
      const blob = Base64ToBlob(base64Image, "image/png");
      const file = new File([blob], "generated-image.png", {
        type: "image/png",
      });
      const upload = await pinata.upload.file(file);
      console.log(upload);

      try {
        const data = await pinata.gateways.get(upload.IpfsHash);
        console.log(data);
        setIsUpload(false);
      } catch (error) {
        setLoading(false);
        setIsUpload(false);
        console.log(error);
      }
      console.log(upload.IpfsHash);
      return upload.IpfsHash;
    } catch (error) {
      setLoading(false);
      setIsUpload(false);
      console.error("Failed to upload to IPFS:", error);
    }
  };

  const Base64ToBlob = (
    base64String: string,
    mimeType: string = "image/png"
  ) => {
    const byteCharacters = atob(base64String); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  async function MintNFT() {
    if (!wallet.chain?.id.includes("testnet")) {
      showNotification("Please switch to Sui testnet!", "error");
      return;
    }

    const userAddress = wallet.address;
    if (!userAddress) {
      showNotification("Wallet not connected!", "error");
      return;
    }

    if (!data.name || data.name.length < 2) {
      showNotification("NFT name is required", "error");
      return;
    }

    try {
      setLoading(true);
      let uri = await UploadImage();
      if (!uri) {
        showNotification("Error uploading the NFT. Please try again.", "error");
        return;
      }
      setLoading(true);
      const tx = new Transaction();
      tx.moveCall({
        target:
          "0xab8cc8ff2a5b65a69b2a8748d0485d4d2917f6d0d5b8da4391a6a3904422af6::nft_factory::create_and_mint_collection",
        arguments: [
          tx.object(
            "0x0791cbcaf833b59ec611aad25a16abf90a0f52c0c7d4c0911376eb6c76c6292d"
          ),
          tx.pure.string(data.name),
          tx.pure.string(data.description),
          tx.pure.string(uri),
          tx.pure.u64(1),
        ],
      });

      tx.setGasBudget(1_000_000_000);
      const res = await wallet.signAndExecuteTransaction({
        transaction: tx,
      });
      const txn = await client.waitForTransaction({
        digest: res.digest,
        options: { showEffects: true },
      });
      console.log(tx);
      if (txn.effects?.status.status === "success") {
        setShowMintSuccess(true);
      } else {
        showNotification("Transaction failed", "error");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      showNotification(
        `Failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "error"
      );
      setLoading(false);
    }
  }

  const CloseOnMint = () => {
    setStep(0);
    setBase64Image("");
    setPrompt({
      prompt: "",
      style: "",
    });
    setShowMintSuccess(false);
    setLoading(false);
  };

  return (
    <div className="text-main-text p-6 flex flex-col items-center w-[750px]">
      {/* Tab Content */}
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          <Input
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            placeholder="NFT Name"
            className="rounded-md ring-(--primary) bg-transparent"
            // error={mintError.name}
          />
          <Textarea
            onChange={(e) => setData({ ...data, description: e.target.value })}
            value={data.description}
            placeholder="Description (optional)"
            className="rounded-md h-[48px] field-content ring-(--primary) bg-transparent"
          />
          <button
            className={`w-full py-3 rounded-md border border-(--primary) ${
              !loading && " hover:bg-(--primary) hover:text-white"
            }`}
            onClick={MintNFT}
            disabled={loading}
          >
            {!loading ? (
              "MINT"
            ) : (
              <div className="flex gap-x-2 justify-center items-center">
                <span>
                  {isUpload ? "Uploading NFT" : "Mint to your wallet"}
                </span>
                <Icon
                  className="text-(--primary) w-5 h-5"
                  icon="eos-icons:loading"
                />
              </div>
            )}
          </button>
        </div>
      </div>

      {showMintSuccess && (
        <div className="fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className="relative max-w-[500px] bg-white p-8 rounded-2xl z-[99999]">
              <div
                className="absolute top-2 right-2 bg-main-text p-2 w-6 h-6 flex justify-center items-center text-background rounded-full cursor-pointer"
                onClick={CloseOnMint}
              >
                X
              </div>
              <div className="relative flex flex-col items-center border-(--primary) border pt-8 pb-4 rounded-xl px-4">
                <p className="text-main-text text-xl mb-4">
                  Your NFT successfully minted
                </p>
                {/* <div className="flex justify-center gap-x-2">
                  <a
                    href={`https://explorer.mainnet.abs.xyz/tx/${mintHash}`}
                    className="border border-(--primary) py-2 px-4 rounded-full"
                    target="_blank"
                  >
                    Visit on Block Explorer
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTTabs;
