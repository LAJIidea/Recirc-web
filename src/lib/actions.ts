const DATABASE_WORKER_URL = import.meta.env.VITE_DATABASE_WORKER_URL;
const WORKERS_KEY = import.meta.env.VITE_WORKERS_KEY as string;


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