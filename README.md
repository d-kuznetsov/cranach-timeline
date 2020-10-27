# Project 2 - Development
The goal of this project is to create a web application based on the prototype from *Project 1*.

You can see the current state of the project [on the website](https://cranach-timeline.dmitry-kuznetsov.vercel.app/).

1. [Board](https://github.com/d-kuznetsov/cranach-timeline/projects/1)
2. [Timesheet](https://github.com/d-kuznetsov/cranach-timeline/wiki/Timesheet)
3. [Technology stack](#technology-stack)

## Technology stack
The following technologies are used in the project
* [Next.js](https://nextjs.org/)
* [Redux-thunk](https://github.com/reduxjs/redux-thunk)
* [Material-UI](https://material-ui.com/)
* [Jest](https://jestjs.io/)
* [Enzyme](https://enzymejs.github.io/enzyme/)
* [CSS Modules](https://github.com/css-modules/css-modules) 
* [Sass](https://sass-lang.com/)

## Code Conventios
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [BEM](http://getbem.com/)

### Project setup
```
npm install
```
### Start development server
```
nmp run dev
```
### Builds app for production usage
```
npm run build 
```
### Start production server
```
npm run start
```
### Run tests
```
npm run test
```

## Git Workflow
In this workflow, we have three branches
* **master** branch will have production code only. In other words, anything you push to the master branch better be free of bugs.
* **dev** branch will be the "live" version of your software. This is the branch that developers will push to on a regular basis with new features.
* **feature** technically is not a single branch. Each feature branch represents a new chunk of code that will eventually be tested and added to the codebase.

The basic steps in this flow are as follows:
1. Create a new branch from the **dev** branch and call it something like **feature-< describe feature here, or give it an ID >**
2. Work on your feature, committing to this **feature** branch
3. Test your feature
4. Merge your **feature** into the **dev** branch
5. Delete your **feature** branch
6. Once enough features have been added, prepare your release
7. When the release is tested and prepped, merge the **dev** branch into **master**
8. Tag the **master** branch commit to the correct version (i.e. v1.1)
9. Repeat

## License
This application is [MIT](./LICENSE.md) licensed.
