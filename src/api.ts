import { v4 as uuid } from 'uuid';
import { getAuthToken } from './auth';

type Method = 'GET' | 'POST';

const BASE_URL = 'https://deca.systems/dev-v1-core';

async function fetchJson(method: Method, url: string, body: BodyInit) {
  const authToken = await getAuthToken();
  const resp = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body,
  });
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export function createAtom(content: string): Promise<void> {
  const id = uuid().toString();
  return fetchJson('POST', `/atoms/atom/${id}`, content);
}
