import { updateAuthToken } from './auth';
import {
  createAtomFromPage,
  getSelection,
  showNotification,
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
    run(tab.id, () => showNotification('Created a new atom', false));
  } catch (e) {
    console.warn(e);
    run(tab.id, () => showNotification('Failed to create atom', true));
  }
});

function run<T>(tabId: number, fn: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: fn,
      },
      (results: chrome.scripting.InjectionResult[]) => {
        const mainFrame = results.find((r) => r.frameId === 0);
        if (mainFrame) {
          resolve(mainFrame.result);
        } else {
          reject();
        }
      }
    );
  });
}
