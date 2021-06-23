import { useState, StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './button.module.scss';

const App = () => {
  const [color, setColor] = useState('');

  useEffect(() => {
    chrome.storage?.sync.get('color', ({ color }) => {
      setColor(color);
    });
  }, []);

  return (
    <div>
      <h1>My React and TypeScript App! {new Date().toLocaleDateString()}</h1>
      <button
        type="button"
        className={styles.button}
        style={{ backgroundColor: color }}
        onClick={onClick}
      ></button>
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
async function onClick() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  }
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage?.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
