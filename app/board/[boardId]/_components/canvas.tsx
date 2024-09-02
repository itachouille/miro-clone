"use client";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMyPresence,
  useOthers,
} from "@liveblocks/react/suspense";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import { useCallback, useState } from "react";
import Cursor from "./cursor";

interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const [{ cursor }, updateMyPresence] = useMyPresence();

  const others = useOthers();

  const onPointerMove = (event: React.PointerEvent) => {
    updateMyPresence({
      cursor: {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      },
    });
  };

  const onPointerLeave = () =>
    updateMyPresence({
      cursor: null,
    });

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />

      {others.map(({ connectionId, presence }) => {
        if (presence.cursor === null) {
          return null;
        }
        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            connectionId={connectionId}
          />
        );
      })}
    </main>
  );
}
