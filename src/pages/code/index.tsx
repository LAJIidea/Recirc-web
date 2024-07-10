
import { lazy, Suspense, useState, useEffect } from "react";
import Navbar from "@/components/editor/navbar"
import { Room } from "@/components/editor/live/room"
import { Sandbox, User, UsersToSandboxes } from "@/lib/types"
import { useClerk, useUser, ClerkProvider } from "@clerk/clerk-react"
import { getUserData, getSandboxData, getSharedUsers } from "@/lib/actions"
import Loading from "@/components/editor/loading"
import fs from "fs"

export const revalidate = 0

// const CodeEditor = dynamic(() => import("@/components/editor"), {
//   ssr: false,
//   loading: () => <Loading />,
// })

const CodeEditor = lazy(() => import("@/components/editor"))

// function getReactDefinitionFile() {
//   const reactDefinitionFile = fs.readFileSync(
//     "node_modules/@types/react/index.d.ts",
//     "utf8"
//   )
//   return reactDefinitionFile
// }

export default function Code({ params }: { params: { id: string } }) {
  // const user = useUser()
  // const user = await currentUser()
  const sandboxId = params.id

  // if (!user) {
  //   // redirect("/")
  // }

  const [userData, setUserData] = useState<User>();
  const [sandboxData, setSandboxData] = useState<Sandbox>();
  const [shared, setShare] = useState<{
    id: string;
    name: string;
  }[]>();

  const [reactDefinitionFile, setReactFile] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const user_res = await getUserData("01");
      const sandbox_res = await getSandboxData(sandboxId);
      const shared_res = await getSharedUsers(sandbox_res.usersToSandboxes)
      setUserData(user_res)
      setSandboxData(sandbox_res)
      setShare(shared_res)
    };

    fetchData();
  }, [sandboxId])

  if (userData && sandboxData && shared) {
    const isOwner = sandboxData.userId === "01"
    const isSharedUser = shared.some((uts) => uts.id === "01")
  
    // if (!isOwner && !isSharedUser) {
    //   return notFound()
    // }
  
    // if (isSharedUser && sandboxData.visibility === "private") {
    //   return notFound()
    // }
  
    return (
      <div className="code-sand overflow-hidden w-screen h-screen overscroll-none flex flex-col bg-background">
        <Room id={sandboxId}>
          <Navbar userData={userData} sandboxData={sandboxData} shared={shared} />
          <div className="flex grow">
            {/* <Suspense fallback={<Loading />}> */}
              <CodeEditor
                userData={userData}
                sandboxData={sandboxData}
                reactDefinitionFile={reactDefinitionFile}
              />
            {/* </Suspense> */}
          </div>
        </Room>
      </div>
    )
  } else {
    return <Loading/>
  }
}
