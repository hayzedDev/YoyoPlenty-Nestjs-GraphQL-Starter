import { Test, TestingModule } from '@nestjs/testing';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import mongoose from 'mongoose';

const todoId = '6630d96f727565cd667ed1d4';

const mockTodo: Todo = {
  _id: todoId as unknown as mongoose.Schema.Types.ObjectId,
  title: 'Sample Title',
  description: 'Mock description',
  completed: false,
};

const postsServiceMock = {
  // findOne: jest.fn((): Todo => mockTodo),
  // findAll: jest.fn((): Todo[] => [mockTodo]),
  findOne: jest.fn().mockResolvedValue(mockTodo),
  findAll: jest.fn().mockResolvedValue([mockTodo]),
};

describe('TodosResolver', () => {
  let resolver: TodosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports:
      providers: [
        TodosResolver,
        { provide: TodosService, useValue: postsServiceMock },
      ],
    }).compile();

    resolver = module.get<TodosResolver>(TodosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single todo', async () => {
    const result = await resolver.findOne(todoId);
    expect(result._id.toString()).toEqual(todoId);
  });

  it('should query all todos', async () => {
    const result = await resolver.findAll();
    console.log(result);
    expect(Array.isArray(result)).toEqual(true);
  });
});
