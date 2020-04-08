import React from "react";
import ContentLoader from "react-content-loader";

export default function Loader({
  children,
  rowSize = 8,
  height = 50,
  viewBox = "80%",
}) {
  return (
    <ContentLoader
      speed={1}
      width={"100%"}
      height={height * rowSize}
      viewBox={`0 0 ${viewBox} ${height * rowSize}`}
      backgroundColor={"var(--loader-bg)"}
      foregroundColor={"var(--loader-foreground)"}>
      {children
        ? children
        : Array(rowSize)
            .fill(null)
            .map((_, i) => (
              <>
                <rect
                  rx={5}
                  ry={5}
                  x={"0"}
                  y={i * height}
                  width="30%"
                  height="38"
                />
                <rect
                  rx={5}
                  ry={5}
                  x={"31%"}
                  y={i * height}
                  width="3%"
                  height="38"
                />
                <rect
                  rx={5}
                  ry={5}
                  x={"35%"}
                  y={i * height}
                  width="66%"
                  height="38"
                />
              </>
            ))}
    </ContentLoader>
  );
}
