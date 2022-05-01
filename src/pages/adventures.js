import React from 'react';
import { graphql } from 'gatsby';
import Adventures from '../components/Adventures/Adventures';
import adventuresStrings from '../components/Adventures/adventuresStrings';

export default function AdventuresPage({ data }) {
  const { adventures } = data;
  return <Adventures page={adventuresStrings} adventures={adventures} />;
}

export const query = graphql`
query AdventuresPageQuery {
  adventures: allFile(
    filter: {sourceInstanceName: {eq: "defaultContent"}, relativePath: {regex: "/adventures/.+/index.mdx/"}}
  ) {
    nodes {
      childMdx {
        id
        slug
        frontmatter {
          title
          levels
          setting
          playernum
        }
        body
      }
    }
  }
}
`;
