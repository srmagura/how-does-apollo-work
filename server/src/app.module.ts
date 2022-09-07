import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), '../schema.gql'),
      sortSchema: true,
      cors: {
        origin: 'http://localhost:4000',
        credentials: true,
      },
    }),
  ],
  providers: [TodoResolver],
})
export class AppModule {}
