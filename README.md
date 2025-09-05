<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://github.com/J4nvg/blogAggregator/blob/main/img/thumb_creds_to_chatgpt.png" alt="Logo" width="250" height="250">
  </a>

<h3 align="center">Blog-Aggregator</h3>

  <p align="center">
    Typescript based Blog-aggregator as part of the Boot.dev curriculum. 
    <br />
    Can be used fetch RSS feeds, and view latests posts in a CLI application.
    <br />
    <a href="https://www.boot.dev/courses/build-blog-aggregator-typescript">Based on the boot.dev course</a>
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
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Project allows for 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
[![Next][Next.js]][Next-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
* npm
* PostGresql

1. Install npm
```sh
npm install -g npm
```

2. Install postgres  
```sh
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo passwd postgres # Linux only
```


### Installation
1. Setup a config file in your home directory `~/.gatorconfig.json`
```json
{
  "db_url": "protocol://username:password@host:port/database?sslmode=disable",
  "current_user_name": "username_goes_here"
}
```
2. Register a user from project directory.
  ```npm
  npm run start register >name<
  ```
3. Log the user in.
  ```npm
  npm run start login >name<
  ``` 

4. use the help command to list possible commands.
  ```npm
  npm run start help
  ``` 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Right order to do things:
- Register
- Login
- Addfeed <name> <url>
- Agg 1m0s
- browse <amount of posts>
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/jvangestel
[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=typescript&logoColor=blue
[Next-url]: https://www.typescriptlang.org/
