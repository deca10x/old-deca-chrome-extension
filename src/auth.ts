export function updateAuthToken(authToken: string): void {
  chrome.storage.local.set({ authToken });
}

export function getAuthToken(): Promise<string> {
  return new Promise<string>((resolve) => {
    chrome.storage.sync.get('authToken', (values) => resolve(values.authToken));
  });
}
