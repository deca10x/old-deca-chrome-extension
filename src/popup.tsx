import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { useAuthToken } from './auth';

import styles from './button.module.scss';

const App = () => {
  const authToken = useAuthToken();

  return (
    <div>
      <h1>Deca</h1>
      <p>{authToken.length > 0 ? 'Token Found' : 'No token'}</p>
      <button className={styles.button} type="button">
        Create Atom
      </button>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// When the button is clicked, inject setPageBackgroundColor into current page
// async function onClick() {
//   const [tab] = await chrome.tabs.query({
//     active: true,
//     currentWindow: true,
//   });

//   if (tab.id) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });
//   }
// }

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage?.sync.get('color', ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }
