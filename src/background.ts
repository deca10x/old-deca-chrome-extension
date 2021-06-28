import { updateAuthToken } from './auth';

type MessageType = {
  type: 'updateAuthToken';
  args: [string];
};

chrome.runtime.onMessageExternal.addListener(
  async (request: MessageType, sender, sendResponse) => {
    switch (request.type) {
      case 'updateAuthToken':
        updateAuthToken.apply(null, request.args);
        break;
    }
  }
);
