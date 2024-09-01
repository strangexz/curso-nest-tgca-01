import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';

@Controller('messages')
export class MessagesController {
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
    return 'Mensaje creado';
  }

  @Get()
  getAll() {
    return 'Lista de mensajes';
  }

  @Put(':id')
  update(@Body() updateMessageDto: CreateMessageDto) {
    console.log(updateMessageDto);
    return 'Mensaje actualizado';
  }

  @Delete(':id')
  delete() {
    return 'Mensaje eliminado';
  }
}
