import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput, FindTodosQuery } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    return await this.todosService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  async findAll(
    @Args('findTodosQuery', { type: () => FindTodosQuery })
    query?: FindTodosQuery,
  ) {
    return await this.todosService.findAll(query);
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return await this.todosService.update(updateTodoInput._id, updateTodoInput);
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => String }) id: string) {
    return await this.todosService.remove(id);
  }
}
