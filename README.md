<div id="top"></div>
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->
<!-- [![MIT License][license-shield]][license-url] -->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gvorbeck/gatsby-theme-gmcm">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 100px;"><g class="" transform="translate(0,0)" style=""><path d="M256 20a104 104 0 0 0-104 104 104 104 0 0 0 104 104 104 104 0 0 0 104-104A104 104 0 0 0 256 20zM16 256v240h48c64-160 320-160 384 0h48V256h-48v64h-60v-64h-48v64h-60v-64h-48v64h-60v-64h-48v64H64v-64H16z" fill="#000000" fill-opacity="1"></path></g></svg>
  </a>

<h3 align="center">GMCM</h3>
<h4 align="center">Game Master Campaign Manager</h4>

  <p align="center">
    A management tool for your favorite 5e TTRPGs! Keep track of your maps, NPCs, rule references, spells, and monsters in this virtual notebook. Roll virtual dice, click interactive stat sheets, and more.
    <br />
    <a href="https://github.com/gvorbeck/gatsby-theme-gmcm"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/gvorbeck/gatsby-theme-gmcm">View Demo</a>
    ·
    <a href="https://github.com/gvorbeck/gatsby-theme-gmcm/issues">Report Bug</a>
    ·
    <!-- <a href="https://github.com/gvorbeck/gatsby-theme-gmcm/issues">Request Feature</a> -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![GMCM Screen Shot][product-screenshot]](https://example.com)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Gatsbyjs](https://www.gatsbyjs.com/)
- [MUI](https://mui.com/)
- [notistack](https://iamhosseindhv.com/notistack)
- [RPG Dice Roller](https://dice-roller.github.io/documentation/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

The GMCM is built as a Gatsby theme plugin. Your content will reside in `.mdx` files inside `src/content` that will autogenerate pages/content as you create them.

It's simplest to use the GMCM as a localhost tool, but even if you plan to host an instance of your GMCM, it's important to get your local environment set up first.

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure that your terminal accepts `npm` and `gatsby` commands.

- npm
  ```sh
  npm -v
  ```
- Gatsby CLI
  ```sh
  gatsby -v
  ```

Install these if they are not already.

### Installation

- Create the folder where your new gatsby site will live locally
  ```sh
  mkdir my-gmcm
  cd my-gmcm
  ```
- Create a `package.json`
  ```sh
  yarn init -y
  ```
- Install your packages
  ```sh
  yarn add react react-dom gatsby @iamgarrett/gatsby-theme-gmcm
  ```
- Inside `my-gmcm/` create a file called `gatsby-config.js` and add:
  ```js
  module.exports = {
    plugins: ['@iamgarrett/gatsby-theme-gmcm'],
  };
  ```
- Run
  ```sh
  gatsby develop
  ```
  When the process is complete, your GMCM will be live at `http://localhost:8000/`

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/gvorbeck/gatsby-theme-gmcm/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/gvorbeck/gatsby-theme-gmcm](https://github.com/gvorbeck/gatsby-theme-gmcm)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/gvorbeck/gatsby-theme-gmcm.svg?style=for-the-badge
[contributors-url]: https://github.com/gvorbeck/gatsby-theme-gmcm/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gvorbeck/gatsby-theme-gmcm.svg?style=for-the-badge
[forks-url]: https://github.com/gvorbeck/gatsby-theme-gmcm/network/members
[stars-shield]: https://img.shields.io/github/stars/gvorbeck/gatsby-theme-gmcm.svg?style=for-the-badge
[stars-url]: https://github.com/gvorbeck/gatsby-theme-gmcm/stargazers
[issues-shield]: https://img.shields.io/github/issues/gvorbeck/gatsby-theme-gmcm.svg?style=for-the-badge
[issues-url]: https://github.com/gvorbeck/gatsby-theme-gmcm/issues
[license-shield]: https://img.shields.io/github/license/gvorbeck/gatsby-theme-gmcm.svg?style=for-the-badge
[license-url]: https://github.com/gvorbeck/gatsby-theme-gmcm/blob/master/LICENSE.txt
[product-screenshot]: ./src/images/screen.png
