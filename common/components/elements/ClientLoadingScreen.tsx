"use client";

import { useCallback } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientLoadingScreen() {
  const handleFinish = useCallback(() => {
    console.log("Loading finished");
  }, []);

  return <LoadingScreen onFinish={handleFinish} />;
}
