import React from 'react';

function AdventureTease({ title, slug, id }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{slug}</h2>
      <h3>{id}</h3>
      <h4>adventure-tease.js</h4>
    </div>
  );
}

export default AdventureTease;
