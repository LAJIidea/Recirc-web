
import { lazy, Suspense, useState, useEffect } from "react";
import Navbar from "@/components/editor/navbar"
import { Room } from "@/components/editor/live/room"
import { Sandbox, User, UsersToSandboxes } from "@/lib/types"
import { useClerk, useUser, ClerkProvider } from "@clerk/clerk-react"
import Loading from "@/components/editor/loading"
import fs from "fs"

export const revalidate = 0

const getUserData = async (id: string) => {
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/user?id=${id}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
    }
  )
  const userData: User = await userRes.json()
  return userData
}

const getSandboxData = async (id: string) => {
  const sandboxRes = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/sandbox?id=${id}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
    }
  )
  const sandboxData: Sandbox = await sandboxRes.json()
  return sandboxData
}

const getSharedUsers = async (usersToSandboxes: UsersToSandboxes[]) => {
  if (!usersToSandboxes) {
    return []
  }

  const shared = await Promise.all(
    usersToSandboxes.map(async (user) => {
      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/user?id=${user.userId}`,
        {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
          },
        }
      )
      const userData: User = await userRes.json()
      return { id: userData.id, name: userData.name }
    })
  )

  return shared
}

// const CodeEditor = dynamic(() => import("@/components/editor"), {
//   ssr: false,
//   loading: () => <Loading />,
// })

const CodeEditor = lazy(() => import("@/components/editor"))

function getReactDefinitionFile() {
  const reactDefinitionFile = fs.readFileSync(
    "node_modules/@types/react/index.d.ts",
    "utf8"
  )
  return reactDefinitionFile
}

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

  useEffect(() => {
    const fetchData = async () => {
      const user_res = await getUserData("0");
      const sandbox_res = await getSandboxData(sandboxId);
      const shared_res = await getSharedUsers(sandbox_res.usersToSandboxes)
      setUserData(user_res)
    };

    fetchData();
  }, [sandboxId])

  if (userData && sandboxData && shared) {
    const isOwner = sandboxData.userId === "0"
    const isSharedUser = shared.some((uts) => uts.id === "0")
  
    // if (!isOwner && !isSharedUser) {
    //   return notFound()
    // }
  
    // if (isSharedUser && sandboxData.visibility === "private") {
    //   return notFound()
    // }
  
    const reactDefinitionFile = getReactDefinitionFile()
  
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
