# Project 2 - Development
The goal of this project is to create a web application based on the prototype from *Project 1*.

You can see the current state of the project [on the website](https://cranach-timeline.dmitry-kuznetsov.vercel.app/).

## Table of contents
1. [Board](https://github.com/d-kuznetsov/cranach-timeline/projects/1)
2. [Timesheet](https://github.com/d-kuznetsov/cranach-timeline/wiki/Timesheet)
3. [Technology stack](#technology-stack)
4. [Code Conventios](#code-conventios)
5. [Setup](#setup)
6. [Git Workflow](#git-workflow)
7. [License](#license)

## Technology stack
[React](https://reactjs.org/) is a JavaScript library for building user interfaces. React allows you to write code in a **declarative style**, which reduces time costs and also makes the code more predictable. React assumes the use of **reusable components**, which reduces the amount of code and makes the project more structured. To the benefits of the library, you can also have a huge community and many ready-made solutions. An alternative solution could be the **Vue.js**

To build a complete web application with React from scratch, there are many important details you need to consider:
* Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
* You need to do production optimizations such as code splitting.
* You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side rendering or client-side rendering.
* You might have to write some server-side code to connect your React app to your data store.

[Next.js](https://nextjs.org/) provides a solution to all of the above problems. An alternative solution could be the **Gatsby**.

[Redux](https://redux.js.org/) is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

[Material-UI](https://material-ui.com/) is used as the component library. Material-UI provides a wide range of helpful components, like app bars, auto complete, badges, buttons, cards, dialog boxes, icons, menus, sliders and more. Helpfully, Material-UI also offers React themes and templates, so you can have a custom color theme for your app. An alternative solution could be the **React Bootstrap**.

CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help.

[Sass](https://sass-lang.com/) lets you use features that don't exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.

## Code Conventios
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [BEM](http://getbem.com/)

## Setup
```bash
# install the dependencies
npm install

# start app in development mode
nmp run dev

# build app for production usage
npm run build

# start production server
npm run start

# run tests
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
