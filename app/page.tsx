import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-5">
      <div>This is a screen fo authenticated users only</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}
