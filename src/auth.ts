import { useEffect, useState } from 'react';

export function updateAuthToken(authToken: string): void {
  chrome.storage.local.set({ authToken });
}

export function getAuthToken(): Promise<string> {
  return new Promise<string>((resolve) => {
    chrome.storage.local.get('authToken', (values) =>
      resolve(values.authToken)
    );
  });
}

export function removeAuthToken(): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.local.remove('authToken', resolve);
  });
}

export function useAuthToken(): string {
  const [token, setToken] = useState('');

  useEffect(() => {
    getAuthToken().then(setToken);
  }, []);

  return token;
}
