import { updateAuthToken } from './auth';
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

chrome.action.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  if (!tab.id) return;

  const pageInfo = await run(tab.id, getSelection);
  try {
    await createAtomFromPage(pageInfo);
    await run(tab.id, showNotification);
  } catch (e) {
    console.warn(e);
    await run(tab.id, showError);
  }
});

function run<T>(tabId: number, fn: () => T): Promise<T> {
  return chrome.scripting
    .executeScript({
      target: { tabId },
      function: fn,
    })
    .then((results: chrome.scripting.InjectionResult[]) => {
      const mainFrame = results.find((r) => r.frameId === 0);
      if (mainFrame) {
        return mainFrame.result;
      } else {
        throw new Error('no response');
      }
    });
}
