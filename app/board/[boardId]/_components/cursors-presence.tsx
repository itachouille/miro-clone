"use client";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { memo } from "react";
import Cursor from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connctionId) => (
        <Cursor key={connctionId} connectionId={connctionId} />
      ))}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
