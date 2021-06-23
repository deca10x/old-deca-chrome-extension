import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <h1>My React and TypeScript App! {new Date().toLocaleDateString()}</h1>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Initialize button with user's preferred color
const changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', ({ color }) => {
  if (changeColor) {
    changeColor.style.backgroundColor = color;
  }
});

// When the button is clicked, inject setPageBackgroundColor into current page
if (changeColor) {
  changeColor.addEventListener('click', async () => {
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
  });
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
