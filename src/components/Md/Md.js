import React from 'react';
import Markdown from 'markdown-to-jsx';

export default function Md({ components, children }) {
  const comps = components.reduce((accumulator, c) => {
    accumulator[c.name] = c;
    return accumulator;
  }, {});
  return <Markdown options={{ overrides: comps }}>{children}</Markdown>;
}
