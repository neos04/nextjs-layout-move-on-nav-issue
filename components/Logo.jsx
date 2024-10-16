import { GlobeIcon } from "lucide-react";
import Image from "next/image";

export default function Logo({ noText }) {
  return (
    <div className="logo2 | flex items-center gap-4">
      <GlobeIcon size={80} className={"shrink-0"} />

      {!noText && (
        <div className="relative">
          <h3 className=" text-[28px] font-bold leading-[120%]">
            Some <br /> Comp
          </h3>
          {/* <span className="absolute right-0 top-[-10px] text-sm text-muted-foreground">
            v0.1
          </span> */}
        </div>
      )}
    </div>
  );
}
