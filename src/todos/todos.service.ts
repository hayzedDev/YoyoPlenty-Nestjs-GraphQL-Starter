import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, FindTodosQuery } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    return await this.todoModel.create(createTodoInput);
  }

  async findAll(query?: FindTodosQuery) {
    query.page = isNaN(+query.page) || +query.page <= 0 ? 1 : +query.page;
    query.limit = isNaN(+query.limit) || +query.limit <= 0 ? 20 : +query.limit;

    return await this.todoModel
      .find()
      .skip((+query.page - 1) * +query.limit)
      .limit(+query.limit);
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findOne({ _id: id });

    if (!todo) throw new NotFoundException('Todo Not Found!');
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id },
      { ...updateTodoInput },
      { new: true },
    );
    if (!todo) throw new NotFoundException('Todo Not Found!');

    return todo;
  }

  async remove(id: string) {
    const deletedTodo = await this.todoModel.findByIdAndDelete({ _id: id });

    if (!deletedTodo) throw new NotFoundException('Todo Not Found!');
    return deletedTodo;
  }
}
