import React from 'react';
import { graphql } from 'gatsby';
import Adventures from '../components/Adventures';

export default function AdventuresPage({ data }) {
  const { page, adventures } = data;
  return <Adventures page={page} adventures={adventures} />;
}

export const query = graphql`
query AdventuresPageQuery {
  page: file(
    sourceInstanceName: {eq: "defaultContent"}
    relativePath: {eq: "pages/Adventures.mdx"}
  ) {
    childMdx {
      id
      frontmatter {
        title
      }
    }
  }
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
