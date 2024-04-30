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
    const task = await this.todoModel.findOne({ _id: id });

    if (!task) throw new NotFoundException('Task Not Found!');
    return task;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    return await this.todoModel.findOneAndUpdate(
      { _id: id },
      { ...updateTodoInput },
      { new: true },
    );
  }

  async remove(id: string) {
    const deletedTask = await this.todoModel.findByIdAndDelete({ _id: id });

    if (!deletedTask) throw new NotFoundException('Task Not Found!');
    return deletedTask;
  }
}

// @Injectable()
// export class CatsService {
//   constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

//   async create(createCatDto: CreateCatDto): Promise<Cat> {
//     const createdCat = await this.catModel.create(createCatDto);
//     return createdCat;
//   }

//   async findAll(): Promise<Cat[]> {
//     return this.catModel.find().exec();
//   }

//   async findOne(id: string): Promise<Cat> {
//     return this.catModel.findOne({ _id: id }).exec();
//   }

//   async delete(id: string) {
//     const deletedCat = await this.catModel
//       .findByIdAndRemove({ _id: id })
//       .exec();
//     return deletedCat;
//   }
// }
