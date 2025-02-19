import Logo from "@/assets/logo.svg";
import { Pencil, Users } from "lucide-react";
import { Sandbox, User } from "@/lib/types";
import UserButton from "@/components/radix-ui/userButton";
import { Button } from "@/components/radix-ui/button";
import { useState } from "react";
import EditSandboxModal from "./edit";
import ShareSandboxModal from "./share";
import { Avatars } from "../live/avatars";

export default function Navbar({
  userData,
  sandboxData,
  shared,
}: {
  userData: User;
  sandboxData: Sandbox;
  shared: {
    id: string;
    name: string;
  }[];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isOwner = sandboxData.userId === userData.id;

  return (
    <>
      <EditSandboxModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        data={sandboxData}
      />
      <ShareSandboxModal
        open={isShareOpen}
        setOpen={setIsShareOpen}
        data={sandboxData}
        shared={shared}
      />
      <div className="h-14 shrink-0 px-2 w-full flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="ring-offset-2 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <img src={Logo} alt="Logo" width={36} height={36} />
          </a>
          <div className="text-sm font-medium flex items-center">
            {sandboxData.name}
            {isOwner ? (
              <button
                onClick={() => setIsEditOpen(true)}
                className="h-7 w-7 ml-2 flex items-center justify-center bg-transparent hover:bg-muted-foreground/25 cursor-pointer rounded-md ring-offset-2 transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Pencil className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex items-center h-full space-x-4">
          <Avatars />

          {isOwner ? (
            <Button variant="outline" onClick={() => setIsShareOpen(true)}>
              <Users className="w-4 h-4 mr-2" />
              Share
            </Button>
          ) : null}
          <UserButton userData={userData} />
        </div>
      </div>
    </>
  );
}
