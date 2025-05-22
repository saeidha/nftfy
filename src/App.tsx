import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import NftGenerator from "./Pages/NftGenerator/NftGenerator";
import ChatBot from "./Pages/ChatBot/ChatBot";
import MarketPlace from "./Pages/MarketPlace/MarketPlace";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/nft-generator/:text?" element={<NftGenerator />} />
        <Route path="/ai-assist" element={<ChatBot />} />
        <Route path="/mint-pad/:nftId?" element={<MarketPlace />} />
      </Routes>
    </Router>
  );
}

export default App;
