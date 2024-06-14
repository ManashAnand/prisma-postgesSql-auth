"use client";
import React from "react";

import Lottie from "lottie-react";
import NotFoundAnimation from "@/assets/NotFound.json";
import BackButton from "@/components/custom/BackButton";

const NotFound = () => {
  return (
    <>
      <BackButton />
      <Lottie animationData={NotFoundAnimation} loop={true} />
    </>
  );
};

export default NotFound;
