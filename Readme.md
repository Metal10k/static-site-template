###Static site generator

A simple node project template to turn various language and templating tools into a simple static site consisting of html, css, and javascript

Currently supports:

* Harp
* Typescript
* Less

####Getting started

In order to get going with this project you need to run the following commands:

```
npm install
gulp build
```

the bin folder will contain your generated static site. 
From here you can copy this to your ftp or point your webserver here.

Node is not required for deployments, it is only used as a build tool.

###Available commands
```
gulp build-ts
gulp build-less
gulp build-views
gulp build
gulp clean
gulp zip
```