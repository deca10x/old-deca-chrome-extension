import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './global.scss';
import styles from './options.module.scss';

const App = () => (
  <div className={styles.container}>
    <main className={styles.content}>
      <h1 className={styles.title}>Deca Extension</h1>
      <p>
        Welcome to the deca extension! Before you start using, you&apos;ll need
        to{' '}
        <a
          href="http://localhost:8000/signin?chromeExtensionWelcome=true"
          target="_blank"
          rel="noreferrer"
        >
          sign in to deca.xyz
        </a>
        .
      </p>
      <h2>How to use</h2>
      <p>
        Click the Deca extension button (looks like{' '}
        <img src="/images/icon-16.png" width="16px" height="16px" />) to save
        the the current page as an atom. If you have text selected, that text
        will be saved in the atom as well. You can also use the keyboard
        shortcut <code>CMD+Shift+s</code> instead of clicking the button.
      </p>
    </main>
  </div>
);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
