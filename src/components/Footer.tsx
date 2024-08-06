import React from "react";
import ScrollToTopButton from "../utils/ScrollToTopButton";

function Footer() {
  return (
    <div className="bg-light border-t">
      <footer className="w-[90%] mx-auto flex md:flex-row flex-col justify-center md:justify-between items-center md:py-0 py-4">
        <p className="md:py-6 py-2 font-secondory text-sm text-gray-600">
          Copyright © 2023 - All right reserved
        </p>
        <p className="md:py-6 py-2 font-secondory text-sm text-gray-600">
          Powered by cwmservices
        </p>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}

export default Footer;
