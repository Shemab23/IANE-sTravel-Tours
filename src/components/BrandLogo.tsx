import React from "react";

interface BrandLogoProps {
  /** "dark" = logo for use on light backgrounds. "light" = logo for use on dark backgrounds. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

// Height-only sizing — width follows automatically since the logo is
// landscape (wider than tall). Don't force a width class here or it'll
// either crop the image or leave empty space beside it.
const HEIGHT_CLASSES: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "h-10",
  md: "h-12",
  lg: "h-18",
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "dark",
  size = "md",
}) => {
  // NOTE: verify these filenames match your actual assets — "dark" variant
  // (for light backgrounds) should be your full-color logo; "light" variant
  // (for dark backgrounds, e.g. a dark footer) should be the light/white one.
  const logoSrc =
    variant === "light" ? "/assets/logo/light.jpg" : "/assets/logo/green.jpg";

  return (
    <img
      src={logoSrc}
      alt="IAN'S Travel & Tours"
      className={`${HEIGHT_CLASSES[size]} w-auto object-contain rounded-2xl`}
    />
  );
};
