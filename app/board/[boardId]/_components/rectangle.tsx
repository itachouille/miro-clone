import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export default function Rectangle({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: RectangleProps) {
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px)`,
      }}
      x={0}
      y={0}
      width={layer.width}
      height={layer.height}
      fill={layer.fill ? colorToCss(layer.fill) : "#000"}
      strokeWidth={1}
      stroke={selectionColor || "transparent"}
    />
  );
}
