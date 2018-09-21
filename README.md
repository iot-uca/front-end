<p align="center"><img src="src/assets/cosmos-gui.jpg">
 <h1 align="center">Cosmos</h1>
  <p align="center">
      X is particular Cosmos graphical user interface written in Vue.js.
    <br>
    <a href="docs/"><strong>Explore the docs »</strong></a>
    <br>
    <br>
    <a href="https://github.com/iot-uca/front-end/issues/new?labels=Type%3A+Defect">Report defect</a>
    |
    <a href="https://github.com/iot-uca/front-end/issues/new?labels=Type%3A+Feature">Request feature</a>
  </p>
</p>

[![GitHub release](https://img.shields.io/github/release/ba-st/Cannon.svg)](https://github.com/iot-uca/front-end/releases/latest)
[![Build Status](https://travis-ci.org/iot-uca/front-end.svg?branch=master)](https://travis-ci.org/iot-uca/front-end)



> *Name origin*: TBD

With X, we aim to provide a simple, light-weight, powerfull platform to interact with Cosmos.


> Structural Projects

- [Vue JS 2](https://github.com/vuejs/vue)
- [Vue Router](https://github.com/vuejs/vue-router)
- [Vue X](https://github.com/vuejs/vuex)
- [Bootstrap 4.1](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
- [Chart Js](https://github.com/chartjs/Chart.js)

> Production Components

- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)



## License
- The code is licensed under [MIT](LICENSE).

## How to run

A Docker image is pushed to Docker Hub every time CI runs successfully. 

First download the latest docker image:

  docker pull jnahas/cosmos-ui

From CLI run:

  docker run -it -p 8080:80 --rm --name cosmos-gui jnahas/cosmos-ui


## Contibute

* Clone repository
* Open project on your favorite IDE/Text-Editor
* Enjoy!
