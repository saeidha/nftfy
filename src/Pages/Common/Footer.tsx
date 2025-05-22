import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useState } from "react";

export default function Footer() {
  const [data, setData] = useState({
    email: "",
  });
  const Signup = () => {};
  return (
    <footer className="p-8 bg-footer z-10 relative">
      <section className="container mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl text-main-text w-[800px]">Stay in the loop</h2>
          <p className="text-main-text text-3xl mb-2 w-[300px] flex justify-center items-center">
            Join the community
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-main-muted text-xl mb-5 w-[800px]">
            Join our mailing list to stay loop with our newest feature releases.
            NFT drops, and tips and tricks for navigating Nftfy.
          </p>
          <div className="col-span-1 flex flex-col w-[300px]">
            <div className="flex gap-x-1 mb-5 w-[300px] justify-center items-center">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <Icon icon="fa6-brands:x-twitter" className="w-10 h-10" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <Icon icon="mingcute:telegram-fill" className="w-10 h-10" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex justify-center items-center">
                <Icon icon="ic:baseline-discord" className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-6">
          <div className="flex gap-2 items-center grow w-[800px]">
            <Input
              placeholder="Your Email Address"
              parentClass="grow max-w-[400px]"
              variant="footer"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Button label="Sign Up" className="rounded-full" onClick={Signup} />
          </div>
          <div className="w-[300px] flex justify-center items-center">
          </div>
        </div>

        <div className="mt-8 text-center text-main-muted text-xl">
          <p>2025 Nftfy</p>
        </div>
      </section>
    </footer>
  );
}
