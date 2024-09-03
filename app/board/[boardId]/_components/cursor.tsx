"use client";

import { connectionIdToColor } from "@/lib/utils";
import { Camera } from "@/types/canvas";
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";

interface CursorProps {
  camera: Camera;
  connectionId: number;
  x: number;
  y: number;
}

export default function Cursor({ connectionId, x, y }: CursorProps) {
  const info = useOther(connectionId, (user) => user?.info);
  //const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const name = info?.name || "Teammate";

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="size-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs  text-white font-semibold "
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
}
