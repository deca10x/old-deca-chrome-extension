import { createAtom } from './api';

type PageInfo = {
  title: string;
  url: string;
  selection: string;
};

export function createAtomFromPage(info: PageInfo): Promise<void> {
  const body = info.selection.length > 0 ? info.selection : info.url;
  const content = [
    { type: 'paragraph', children: [{ text: info.title }] },
    {
      type: 'paragraph',
      children: [
        { text: '' },
        { type: 'link', url: info.url, children: [{ text: body }] },
        { text: '' },
      ],
    },
  ];
  return createAtom(JSON.stringify({ content }));
}

export function getSelection(): PageInfo {
  const title = document.title;
  const url = window.location.href;
  const selection = window.getSelection()?.toString() ?? '';
  return { title, url, selection };
}

export function showNotification(text: string, isError: boolean): void {
  const timeout = 3000;

  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.top = '0';
  banner.style.left = '0';
  banner.style.width = '100vw';
  banner.style.height = '30px';
  banner.style.background = isError ? '#e4112b' : '#4b5cf4';
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
}
