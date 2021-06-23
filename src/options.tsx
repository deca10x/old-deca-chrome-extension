/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import './button.scss';

const App = () => <p>Choose a different background color!</p>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const page = document.getElementById('buttonDiv');
const selectedClassName = 'current';
const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event: MouseEvent) {
  // Remove styling from the previously selected color
  const current = (event.target as any).parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  const color = (event.target as any).dataset.color;
  (event.target as any).classList.add(selectedClassName);
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
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
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
