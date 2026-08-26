import type { NextConfig } from "next";
import { assertProductionReady } from "./lib/commercial-config";

if (process.env.VERCEL_ENV === "production") assertProductionReady();

const nextConfig: NextConfig = {
  // Nota: se removió `output: "export"` al migrar a Vercel.
  // `trailingSlash` se mantiene para no romper las URLs ya indexadas.
  trailingSlash: true,
  async headers() {
    return process.env.VERCEL_ENV === "preview"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }]
      : [];
  },
};

export default nextConfig;
