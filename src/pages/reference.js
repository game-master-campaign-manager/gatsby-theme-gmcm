import React from 'react';
import { graphql } from 'gatsby';
import Reference from '../components/Reference/Reference';
import referenceStrings from '../components/Reference/referenceStrings';

export default function ReferencePage({ data }) {
  const { references } = data;
  return <Reference page={referenceStrings} references={references} />;
}

export const query = graphql`
query ReferencePageQuery {
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
