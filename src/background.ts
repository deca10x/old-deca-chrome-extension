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

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  if (tab.id) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: getSelection,
      },
      async (results: chrome.scripting.InjectionResult[]) => {
        const mainFrame = results.find((r) => r.frameId === 0);
        if (mainFrame && tab.id) {
          try {
            await createAtomFromPage(mainFrame.result);
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: () => showNotification('Created a new atom', false),
            });
          } catch (e) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: () => showNotification('Failed to create atom', true),
            });
          }
        }
      }
    );
  }
});
