import { Children, useEffect, useState } from "react";

const ResponsiveComponent = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={isMobile ? "mobile-class" : "desktop-class"}>
      {props.children}
    </div>
  );
};

export default ResponsiveComponent;