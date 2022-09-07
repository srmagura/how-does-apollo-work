# how-does-apollo-work

To run:

1. `cd server`, `yarn`, `yarn start`
2. `cd react-app`, `yarn`, `yarn start`

`getAllTodos` loads all of the todos into the Apollo Cache. But when individual todos are loaded via `getTodoById`, the todos are fetched from the API rather than the Apollo Cache.
