const DATABASE_WORKER_URL = import.meta.env.VITE_DATABASE_WORKER_URL;
const WORKERS_KEY = import.meta.env.VITE_WORKERS_KEY as string;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { Sandbox, User, UsersToSandboxes } from "@/lib/types"

export async function getReactDefination() {
  const data = await fetch(`${SERVER_URL}/react`, {method: 'GET'})
  const defination = await data.text()
  console.log(defination)
  return defination;
}

export async function getUserData(id: string) {
  const userRes = await fetch(`${SERVER_URL}/users?id=${id}`, {method: 'GET'});
  const userData: User = await userRes.json();
  console.log(userData)
  return userData;
}

export async function getSandboxData(id:  string) {
  const sandboxRes = await fetch(
    `${SERVER_URL}/sandbox?id=${id}`, {
      method: 'GET'
    })
  const sandboxData: Sandbox = await sandboxRes.json()
  return sandboxData
}

export const getSharedUsers = async (usersToSandboxes: UsersToSandboxes[]) => {
  if (!usersToSandboxes) {
    return []
  }

  const shared = await Promise.all(
    usersToSandboxes.map(async (user) => {
      const userRes = await fetch(`${process.env.SERVER_URL}api/users?id=${user.userId}`, {method: 'GET'})
      const userData: User = await userRes.json()
      return { id: userData.id, name: userData.name }
    })
  )

  return shared
}

export async function createSandbox(body: {
  type: string;
  name: string;
  userId: string;
  visibility: string;
}) {
  const res = await fetch(`${DATABASE_WORKER_URL}/api/sandbox`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: WORKERS_KEY,
    },
    body: JSON.stringify(body),
  });

  return await res.text();
}

export async function updateSandbox(body: {
  id: string;
  name?: string;
  visibility?: 'public' | 'private';
}) {
  await fetch(`${DATABASE_WORKER_URL}/api/sandbox`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: WORKERS_KEY,
    },
    body: JSON.stringify(body),
  });

  // Handle revalidation logic if needed
  // For example, using a state management library to refresh data
}

export async function deleteSandbox(id: string) {
  await fetch(`${DATABASE_WORKER_URL}/api/sandbox?id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: WORKERS_KEY,
    },
  });

  // Handle revalidation logic if needed
  // For example, using a state management library to refresh data
}

export async function shareSandbox(sandboxId: string, email: string) {
  const res = await fetch(`${DATABASE_WORKER_URL}/api/sandbox/share`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: WORKERS_KEY,
    },
    body: JSON.stringify({ sandboxId, email }),
  });

  const text = await res.text();

  if (res.status !== 200) {
    return { success: false, message: text };
  }

  // Handle revalidation logic if needed
  // For example, using a state management library to refresh data
  return { success: true, message: 'Shared successfully.' };
}

export async function unshareSandbox(sandboxId: string, userId: string) {
  await fetch(`${DATABASE_WORKER_URL}/api/sandbox/share`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: WORKERS_KEY,
    },
    body: JSON.stringify({ sandboxId, userId }),
  });

  // Handle revalidation logic if needed
  // For example, using a state management library to refresh data
}