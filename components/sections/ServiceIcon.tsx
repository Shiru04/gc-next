export type ServiceIconName =
  | "repairs"
  | "maintenance"
  | "installations"
  | "commercial"
  | "attic"
  | "default";

export function ServiceIcon({
  name,
  className = "h-14 w-14",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "repairs":
      return (
        <svg {...common}>
          <path
            d="M14.7 6.3a4.5 4.5 0 0 0-6.36 6.36l-4.6 4.6a1.5 1.5 0 1 0 2.12 2.12l4.6-4.6a4.5 4.5 0 0 0 6.36-6.36Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9.5 9.5 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path
            d="M7 7h10v3H7V7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 10V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "installations":
      return (
        <svg {...common}>
          <path
            d="M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 12h10M7 15h10M7 18h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 2v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.5 3.5 12 2l1.5 1.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "commercial":
      return (
        <svg {...common}>
          <path
            d="M4 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M18 20V10a2 2 0 0 1 2-2h0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M7 8h4M7 12h4M7 16h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "attic":
      return (
        <svg {...common}>
          <path
            d="M3 11.5 12 4l9 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 10.8V20a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 22v-6a2.5 2.5 0 0 1 5 0v6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M12 2v4M12 18v4M4 12H2M22 12h-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M17 7 19 5M5 19l2-2M7 7 5 5M19 19l-2-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
  }
}

export function iconFromService(s: { slug: string; name: string }): ServiceIconName {
  const key = `${s.slug} ${s.name}`.toLowerCase();
  if (key.includes("attic") || key.includes("insulation")) return "attic";
  if (key.includes("repair")) return "repairs";
  if (key.includes("maint")) return "maintenance";
  if (key.includes("install")) return "installations";
  if (key.includes("commercial")) return "commercial";
  return "default";
}
