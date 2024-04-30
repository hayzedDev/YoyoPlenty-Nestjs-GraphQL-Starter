import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Todo title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Description of todo' })
  description: string;
}

@InputType()
export class FindTodosQuery {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { description: 'Page Number', nullable: true })
  page?: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { description: 'Limits per page', nullable: true })
  limit?: number;
}
