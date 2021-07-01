import { updateAuthToken, removeAuthToken } from './auth';
import {
  createAtomFromPage,
  getSelection,
  showNotification,
  showError,
} from './createAtomFromPage';

type MessageType = {
  type: 'updateAuthToken';
  args: [string];
};

chrome.runtime.onMessageExternal.addListener(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (request: MessageType, sender, sendResponse) => {
    switch (request.type) {
      case 'updateAuthToken':
        updateAuthToken(...request.args);
        break;
    }
  }
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: 'https://deca.xyz/signin?chromeExtensionWelcome=true',
  });
});

chrome.action.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  if (!tab.id) return;

  const pageInfo = await run(tab.id, getSelection);
  try {
    await createAtomFromPage(pageInfo);
    await run(tab.id, showNotification);
  } catch (e) {
    if (e?.message === '403') {
      await removeAuthToken();
    }
    await run(tab.id, showError);
    chrome.tabs.create({
      url: 'http://localhost:8000/signin?chromeExtensionWelcome=true',
      active: false,
    });
  }
});

async function run<T>(tabId: number, fn: () => T): Promise<T> {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    function: fn,
  });
  const mainFrame = results.find((r) => r.frameId === 0);
  if (!mainFrame) {
    throw new Error('no response');
  }
  return mainFrame.result;
}
