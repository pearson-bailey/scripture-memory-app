import { useState, useEffect } from "react";
import { Viewport } from "../utils";

export default function useViewport() {
  const [viewport, setViewport] = useState(Viewport.viewport);

  useEffect(() => {
    Viewport.onChange(setViewport);
    return () => Viewport.offChange(setViewport);
  }, []);

  return viewport;
}
