import React from 'react';
import { graphql } from 'gatsby';
import Search from '../components/Search/Search';
import searchStrings from '../components/Search/searchStrings';

export default function SearchPage({ data, location }) {
  const { spells, monsters } = data;
  return <Search location={location} page={searchStrings} spells={spells} monsters={monsters} />;
}

export const query = graphql`
query SearchPageQuery {
  spells: allFile(
    filter: {sourceInstanceName: {eq: "defaultContent"}, relativeDirectory: {eq: "spells"}}
  ) {
    nodes {
      childMdx {
        id
        frontmatter {
          spells {
            attacksave
            castingtime
            components
            description
            duration
            level
            spell
            range
            ritual
            school
            source
          }
        }
      }
    }
  }
  monsters: allFile(
    filter: {sourceInstanceName: {eq: "defaultContent"}, relativeDirectory: {eq: "monsters"}}
  ) {
    nodes {
      childMdx {
        id
        frontmatter {
          monsters {
            monster
            type
            ac {
              value
              notes
            }
            hp {
              notes
              value
            }
            speed
            abilities {
              str
              dex
              con
              int
              wis
              cha
            }
            saves {
              modifier
              name
            }
            senses
            languages
            challenge
            dmgimmunities
            dmgresistances
            dmgvulnerabilities
            cdnimmunities
            traits {
              content
              name
            }
            actions {
              content
              name
            }
            reactions {
              content
              name
            }
            legendaryactions {
              content
              name
            }
            description
            source
          }
        }
      }
    }
  }
}
`;
