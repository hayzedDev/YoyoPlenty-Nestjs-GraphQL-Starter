import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'id of the Todo' })
  _id: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Field(() => Boolean, { description: 'is completed' })
  completed: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Field(() => String, { description: 'Todo title' })
  title: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Field(() => String, { description: 'Description of todo' })
  description: string;
}
