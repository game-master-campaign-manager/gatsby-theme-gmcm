import React from 'react';
import {
  Link,
} from 'gatsby-theme-material-ui';

function LinkMeat({ query, category, children }) {
  return (
    <Link
      to={`/search/?category=${category}`}
      state={{
        query,
      }}
    >
      {children}
    </Link>
  );
}

function MonsterLink({ children, m }) {
  return (
    <LinkMeat query={m} category="monsters">
      {children}
    </LinkMeat>
  );
}

function SpellLink({ children, s }) {
  return (
    <LinkMeat query={s} category="spells">
      {children}
    </LinkMeat>
  );
}

export { MonsterLink, SpellLink };
