import { FC, StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './global.scss';
import styles from './options.module.scss';

const App: FC = () => {
  const isMac = /mac/i.test(navigator.platform);
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <h1 className={styles.title}>Deca Extension</h1>
        <p>
          Welcome! Before you start, you&apos;ll need to{' '}
          <a
            href="http://localhost:8000/signin?chromeExtensionWelcome=true"
            target="_blank"
            rel="noreferrer"
          >
            sign in
          </a>
          .
        </p>
        <h2>How to use</h2>
        <p>
          Click the Deca extension button (looks like{' '}
          <img src="/images/icon-16.png" width="16px" height="16px" />) to save
          the the current page as an atom. If you have text selected, that text
          will be saved in the atom as well.
        </p>
        <p>
          <strong>
            You can also use the keyboard shortcut{' '}
            <code>{isMac ? 'Cmd' : 'Ctrl'}+Shift+Y</code> instead of clicking
            the button.
          </strong>
        </p>
      </main>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
