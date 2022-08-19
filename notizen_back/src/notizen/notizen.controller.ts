import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotizenService } from './notizen.service';
import { CreateNotizenDto } from './dto/create-notizen.dto';
import { UpdateNotizenDto } from './dto/update-notizen.dto';

@Controller('notizen')
export class NotizenController {
  constructor(private readonly notizenService: NotizenService) {}

  @Post()
  create(@Body() createNotizenDto: CreateNotizenDto) {
    return this.notizenService.create(createNotizenDto);
  }

  @Get()
  findAll() {
    return this.notizenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notizenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotizenDto: UpdateNotizenDto) {
    return this.notizenService.update(+id, updateNotizenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notizenService.remove(+id);
  }
}
