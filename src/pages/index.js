import React from 'react';
import { graphql } from 'gatsby';
import Index from '../components/Index';

export default function IndexPage({ data }) {
  return <Index data={data} />;
}

export const query = graphql`
query IndexPageQuery {
  file(
    sourceInstanceName: {eq: "defaultContent"}
    relativePath: {eq: "pages/Index.mdx"}
  ) {
    childMdx {
      id
      frontmatter {
        title
        text
        externalLinks {
          title
          links {
            title
            url
          }
        }
        news {
          title
          version
          bullets
        }
      }
    }
  }
}
`;
