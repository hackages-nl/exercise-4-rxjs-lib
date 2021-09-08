# Build a timer application with TypeScript or Vanilla JavaScript only

Do not forget to read the [readme](../README.md) 

## How to get started

- Launch the app `yarn start` or `npm start` and go to http://localhost:8000/
- Run the tests ! `yarn test` or `npm test`
- Alternatively, run the tests in watch mode `yarn test --watch` or `npm test  -- --watch` then press `a` to run all tests.
- Once your work is done **commit** and **push** `git add src && git commit -m "What did you do?" && git push origin`

Hint: Your application might not run. It probably contains some bugs. You are here to solve them. ;-)

As you can see, you have quite some errors. we're missing one function to make it work: 
- `interval`

## Challenge 2: Build your own version of the `interval` Observable

In this challenge you will implement your own version of the `interval Observable`:
- The implementation should be done in the [src/lib/interval.ts](../src/lib/interval.ts) file.
- The tests are located next to it in the [src/lib/interval.spec.ts](../src/lib/interval.spec.ts) file. 

Do not forget to run the tests with `yarn test --watch` or `npm test  -- --watch` . 

At the end of this exercise, the following points should be met:
- [ ] All tests should be green
- [ ] The function `interval` should be implemented