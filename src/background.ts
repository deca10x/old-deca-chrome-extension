import { updateAuthToken, removeAuthToken } from './auth';
import { SIGN_URL } from './constants';
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
    url: '/options.html',
  });
});

chrome.action.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  if (!tab.id) return;

  const pageInfo = await run(tab.id, getSelection);
  try {
    await createAtomFromPage(pageInfo);
    await run(tab.id, showNotification);
  } catch (e) {
    console.error(e);
    await removeAuthToken();
    chrome.tabs.create({ url: SIGN_URL });
    await run(tab.id, showError);
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
