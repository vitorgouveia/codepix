import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PixKeyGrpcUnknownErrorFilter } from './pix-keys/filters/pix-key-grpc-unknown.error';
import { PixKeyAlreadyExistsErrorFilter } from './pix-keys/filters/pix-key-already-exists.error';
import { ValidationPipe } from '@nestjs/common';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PixKeyAlreadyExistsErrorFilter(),
    new PixKeyGrpcUnknownErrorFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  const configService = app.get(ConfigService);

  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'hero',
        brokers: [configService.get('KAFKA_BROKER')],
      },
      consumer: {
        groupId: configService.get('KAKFA_CONSUMER_GROUP_ID'),
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();
  console.log(configService.get('KAKFA_CONSUMER_GROUP_ID'));
  console.log(configService.get('KAFKA_BROKER'));
  await app.listen(process.env.PORT);
}
bootstrap();
