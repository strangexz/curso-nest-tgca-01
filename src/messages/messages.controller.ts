import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessageService } from './services/message/message.service';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Res() response: Response,
  ) {
    console.log(createMessageDto);
    this.messageService
      .createMessage(createMessageDto)
      .then((message) => {
        response.status(HttpStatus.CREATED).json(message);
      })
      .catch(() => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error al crear el mensaje' });
      });
  }

  @Get()
  getAll(@Res() response: Response) {
    this.messageService
      .getAll()
      .then((messageList) => {
        response.status(HttpStatus.OK).json(messageList);
      })
      .catch(() => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error en la obtención de los mensajes' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMessageDto: CreateMessageDto,
    @Res() response: Response,
    @Param('id') idMessage: number,
  ) {
    console.log(updateMessageDto);
    this.messageService
      .updateMessage(idMessage, updateMessageDto)
      .then((message) => {
        return response.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error en la edición del mensaje' });
      });
  }

  @Delete(':id')
  delete(@Res() response: Response, @Param('id') idMessage: number) {
    this.messageService
      .deleteMessage(idMessage)
      .then((result) => {
        return response.status(HttpStatus.OK).json(result);
      })
      .catch(() => {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error en la eliminación del mensaje' });
      });
  }
}
