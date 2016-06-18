# Build Checker

> Visual alert for your build status

[![Build Status](https://travis-ci.org/willmendesneto/build-checker.png?branch=master)](https://travis-ci.org/willmendesneto/build-checker)

![Build checker: Visual alert for your build status](build-checker.png)

## INTRODUCTION

Application using Arduino + Johnny Five + NodeJS for to monitor build/deploy status in your Continuos Integration server.


## First steps

- [Install Arduino](https://www.arduino.cc/en/Main/Software)
- [Install NodeJS](https://nodejs.org/en/download/)
- [Setup your board](http://johnny-five.io/platform-support/)
- (Optional) Install Johnny-Five Package using ```npm install johnny-five <--global|--save>```


## Usage

```bash
$ git clone <project> && cd $_
$ npm install
$ node index.js # or npm start
```

You will need of:
- 1 Arduino with 2 GND inputs and 2 ports (in this case we are using 12 and 10 ports + 2 GND ports);
- NodeJS;
- Access from internet (for check your CI server);


## Slides

[NodeJS: Lessons Learned](http://slides.com/willmendesneto/nodejs-lessons-learned#/)

## Author

**Wilson Mendes (willmendesneto)**
+ <https://plus.google.com/+WilsonMendes>
+ <https://twitter.com/willmendesneto>
+ <http://github.com/willmendesneto>
