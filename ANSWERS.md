<!-- Answers to the Short Answer Essay Questions go here -->

.

1. In Jest, what are the differences between beforeAll, afterAll, beforeEach, and afterEach? When do they run? What are they used for?
beforeAll runs before the entire test suite is run.  This allows `something` to be established before the tests are run.  This could be used to start a server or create data that can be tested upon.

afterAll runs after the entire test suite is run.  afterAll cleans up the database or closes the server connection after the tests have run.

beforeEach runs before a single test is run.  It can be used to make sure that the data being tested is exactly the same and hasn't been changed by previous tests.

afterEach runs after a single test is run.  If the test has made a promise, afterEach ensures that is resolved before moving on.
1. What is the point of Test Driven Development? What do you personally think about this approach?
TDD has a programmer write tests for what they want their app to do and then writes the minimum amount of code to make the tests pass.  TDD has a programmer plan beforehand the functions and features of their app before writing any of the app code.

I am having trouble wrapping my head around TDD, though that may be because I have only been writing tests for 2-weeks.  I like the idea of having a plan before you start programming, but I am not at a level of experience yet where I would feel able to use TDD with any degree of confidence.  
1. What is a mock function? How do we use it to test a callback passed to a function?
A mock function is a fake function that can be called without needing a browser.  We can use it to test a callback by seeing that it 1-gets called and 2-passes expected paramaters back.
1. Mention three types of tests.
Unit tests check a single unit of code (like a Component) in isolation.

Snapshot testing saves an image of a site and then compares future versions to that image.

Integration testing checks multiple components to check that they work together and do not cause any bugs between the units.
1. What type of test performs database operations against a real server.
Load testing lets you peform tests against a real server.
**I don't remember learning about this in class, so this is just from Google.**
