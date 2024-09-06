import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageService } from './services/message/message.service';

@Module({
  controllers: [MessagesController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
