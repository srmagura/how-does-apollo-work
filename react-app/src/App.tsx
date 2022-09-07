import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { useState } from "react";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const GET_ALL_TODOS = gql`
  query GetAllTodos {
    getAllTodos {
      id
      text
    }
  }
`;

const GET_TODO_BY_ID = gql`
  query GetTodoById($id: Int!) {
    getTodoById(id: $id) {
      id
      text
    }
  }
`;

interface TodoComponentProps {
  id: number;
}

function TodoComponent({ id }: TodoComponentProps) {
  const { data } = useQuery(GET_TODO_BY_ID, { variables: { id } });

  return (
    <p>
      id={data?.getTodoById.id} &nbsp;&nbsp;&nbsp;&nbsp; text="
      {data?.getTodoById.text}"
    </p>
  );
}

function AppCore() {
  const { data } = useQuery(GET_ALL_TODOS);

  const [loadIndividualTodos, setLoadIndividualTodos] = useState(false);

  return (
    <div>
      <h1>getAllTodos</h1>
      {data?.getAllTodos.map((t: any) => (
        <p key={t.id}>
          id={t.id} &nbsp;&nbsp;&nbsp;&nbsp; text="{t.text}"
        </p>
      ))}
      <h1>getTodoById</h1>
      {!loadIndividualTodos && (
        <button onClick={() => setLoadIndividualTodos(true)}>
          Load individual todos
        </button>
      )}
      {loadIndividualTodos &&
        [1, 2, 3, 4, 5].map((id) => <TodoComponent id={id} key={id} />)}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppCore />
    </ApolloProvider>
  );
}
