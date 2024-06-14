"use client";
import React from "react";

import Lottie from "lottie-react";
import loading from "@/assets/loading.json";

const Loading = () => {
  return <Lottie animationData={loading} loop={true} />;
};

export default Loading;
