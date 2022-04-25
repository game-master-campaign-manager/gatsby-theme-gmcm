import React from 'react';
import { graphql } from 'gatsby';
import FourOhFour from '../components/404';

export default function FourOhFourPage({ data }) {
  return <FourOhFour data={data} />;
}

export const query = graphql`
query FourOhFourPageQuery {
  file(
    sourceInstanceName: {eq: "defaultContent"}
    relativePath: {eq: "pages/404.mdx"}
  ) {
    childMdx {
      id
      frontmatter {
        title
        textLines
      }
    }
  }
}
`;
