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
