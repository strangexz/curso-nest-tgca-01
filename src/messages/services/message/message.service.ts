import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/messages/dto/create-message-dto';
import { Message } from '../../entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async createMessage(newMessage: CreateMessageDto): Promise<Message> {
    const newMsg = new Message();
    newMsg.message = newMessage.message;
    newMsg.nick = newMessage.nick;

    return this.messageRepository.save(newMsg);
  }

  async updateMessage(
    idMessage: number,
    newMessage: CreateMessageDto,
  ): Promise<Message> {
    const updMesg = await this.messageRepository.findOneBy({ id: idMessage });
    updMesg.message = newMessage.message;
    updMesg.nick = newMessage.nick;

    return await this.messageRepository.save(updMesg);
  }

  async deleteMessage(idMessage: number): Promise<any> {
    return await this.messageRepository.delete(idMessage);
  }
}
