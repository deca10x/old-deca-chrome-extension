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
          href="https://deca.xyz/signin?chromeExtensionWelcome=true"
          target="_blank"
          rel="noreferrer"
        >
          sign in to deca.xyz
        </a>
        .<h2>How to use</h2>
        <p>
          Click the Deca extension button (looks like{' '}
          <img src="/images/icon-16.png" width="16px" height="16px" />) to save
          the
        </p>
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
