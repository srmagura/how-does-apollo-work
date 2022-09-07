import { Query } from '@nestjs/graphql';
import { Args, Int, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';

const TODOS: Todo[] = [1, 2, 3, 4, 5].map((id) => ({
  id,
  text: `Todo #${id}`,
}));

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => Todo, { nullable: true })
  getTodoById(@Args('id', { type: () => Int }) id: number) {
    return TODOS.find((t) => t.id === id);
  }

  @Query(() => [Todo])
  getAllTodos() {
    return TODOS;
  }
}
