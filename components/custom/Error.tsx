"use client";
import React from "react";

import Lottie from "lottie-react";
import error from "@/assets/error.json";
import BackButton from "./BackButton";

const Error = () => {
  return (
    <>
      <BackButton />
      <Lottie animationData={error} loop={true} />
    </>
  );
};

export default Error;
