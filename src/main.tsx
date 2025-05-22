import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { Buffer } from "buffer";
import ReactDOM from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { NotificationProvider } from "./Layouts/Toast.tsx";
import {
  Chain,
  SuiDevnetChain,
  SuiMainnetChain,
  SuiTestnetChain,
  WalletProvider,
} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { QueryClientProvider } from "@tanstack/react-query";

globalThis.Buffer = Buffer;
const queryClient = new QueryClient();

const SupportedChains: Chain[] = [
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider chains={SupportedChains}>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </WalletProvider>
    </QueryClientProvider>
  </StrictMode>
);
