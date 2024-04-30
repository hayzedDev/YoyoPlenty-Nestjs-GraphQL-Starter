import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
@ObjectType({ description: 'todo ' })
export class Todo {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Todo title' })
  title: string;

  @Prop()
  @Field(() => String, { description: 'Description of todo' })
  description: string;

  @Prop({ index: true, default: false })
  @Field(() => Boolean, { description: 'is completed' })
  completed: boolean;

  @Prop()
  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
