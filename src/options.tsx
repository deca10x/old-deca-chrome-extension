/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import styles from './button.module.scss';

const App = () => (
  <div>
    <p>Choose a different background color!</p>
  </div>
);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

const page = document.getElementById('buttonDiv');
const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event: MouseEvent) {
  // Remove styling from the previously selected color
  const current = (event.target as any).parentElement.querySelector(
    `.${styles.current}`
  );
  if (current && current !== event.target) {
    current.classList.remove(styles.current);
  }

  // Mark the button as selected
  const color = (event.target as any).dataset.color;
  (event.target as any).classList.add(styles.current);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors: string[]) {
  chrome.storage.sync.get('color', (data) => {
    const currentColor = data.color;
    // For each color we were provided…
    for (const buttonColor of buttonColors) {
      // …create a button with that color…
      const button = document.createElement('button');
      button.dataset.color = buttonColor;
      button.classList.add(styles.button);
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(styles.current);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener('click', handleButtonClick);
      if (page) {
        page.appendChild(button);
      }
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);
