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
  @Field(() => Boolean, { description: 'is completed', nullable: true })
  completed: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Field(() => String, { description: 'Todo title', nullable: true })
  title: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Field(() => String, { description: 'Description of todo', nullable: true })
  description: string;
}
