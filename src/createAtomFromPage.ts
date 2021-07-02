import { createAtom } from './api';

type PageInfo = {
  title: string;
  url: string;
  selection: string;
};

export function createAtomFromPage(info: PageInfo): Promise<void> {
  const content = [
    { type: 'paragraph', children: [{ text: info.title }] },
    {
      type: 'paragraph',
      children: [
        { text: '' },
        {
          type: 'link',
          url: info.url,
          children: [{ text: shortenUrl(info.url) }],
        },
        { text: '' },
      ],
    },
  ];
  if (info.selection.length > 0) {
    content.push(
      { type: 'paragraph', children: [{ text: '' }] },
      { type: 'paragraph', children: [{ text: info.selection }] }
    );
  }
  return createAtom(JSON.stringify({ content }));
}

export function getSelection(): PageInfo {
  const title = document.title;
  const url = window.location.href;
  const selection = window.getSelection()?.toString() ?? '';
  return { title, url, selection };
}

export function showNotification(): void {
  const text = 'Created a new atom';
  const timeout = 3000;

  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.zIndex = '2147483647';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100vw';
  banner.style.height = '30px';
  banner.style.background = '#4b5cf4';
  banner.style.color = 'white';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.justifyContent = 'center';
  banner.style.opacity = '0';
  banner.style.transition = 'opacity 500ms ease-in-out';

  banner.innerText = text;
  document.body.prepend(banner);

  // Start transition
  setTimeout(() => {
    banner.style.opacity = '1';
  });

  setTimeout(() => {
    banner.remove();
  }, timeout);

  return;
}

export function showError(): void {
  const text = 'Failed to create atom. Try again?';
  const timeout = 5000;

  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.zIndex = '2147483647';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100vw';
  banner.style.height = '30px';
  banner.style.background = '#e4112b';
  banner.style.color = 'white';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.justifyContent = 'center';
  banner.style.opacity = '0';
  banner.style.transition = 'opacity 500ms ease-in-out';

  banner.innerText = text;
  document.body.prepend(banner);

  // Start transition
  setTimeout(() => {
    banner.style.opacity = '1';
  });

  setTimeout(() => {
    banner.remove();
  }, timeout);

  return;
}

function shortenUrl(url: string): string {
  const THRESHOLD = 35;
  const { host, pathname } = new URL(url);

  // include path sections as long as total length is under THRESHOLD
  const shorted = pathname
    .split('/')
    .filter((p) => p.length)
    .reduce((path, part) => {
      if (host.length + path.length + part.length < THRESHOLD) {
        return `${path}/${part}`;
      }
      if (path[path.length - 1] !== '…') {
        return `${path}/…`;
      }
      return path;
    }, '');

  return `${host}${shorted}`;
}
