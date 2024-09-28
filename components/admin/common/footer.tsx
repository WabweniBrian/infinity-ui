import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-center flex-center-center">
      <p>
        &copy;{new Date().getFullYear()}{" "}
        <a href="#" className="text-brand">
          Infinity UI
        </a>{" "}
        . All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
