import React from 'react';
import { graphql } from 'gatsby';
import Reference from '../components/Reference';

export default function ReferencePage({ data }) {
  const { page, references } = data;
  return <Reference page={page} references={references} />;
}

export const query = graphql`
query ReferencePageQuery {
  page: file(
    sourceInstanceName: {eq: "defaultContent"}
    relativePath: {eq: "pages/Reference.mdx"}
  ) {
    childMdx {
      id
      frontmatter {
        title
      }
    }
  }
  references: allFile(
    filter: {sourceInstanceName: {eq: "defaultContent"}, relativeDirectory: {eq: "references"}}
  ) {
    nodes {
      childMdx {
        id
        frontmatter {
          title
          category
          content {
            type
            terms {
              dt
              dd {
                text
                short
                cite
              }
            }
            title
            headers
            rows {
              cells
            }
            text
          }
        }
        slug
      }
    }
  }
}
`;
