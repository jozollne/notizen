import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Repository } from 'typeorm';
import { CreateNotizenDto } from './dto/create-notizen.dto';
import { UpdateNotizenDto } from './dto/update-notizen.dto';
import { Notizen } from './entities/notizen.entity';

@Injectable()
export class NotizenService {
  
  constructor(
    @InjectRepository(Notizen)
    private notizenRepository: Repository<Notizen>,
  ) {}

  create(createNotizenDto: CreateNotizenDto) {
    var x = this.notizenRepository.create();
    x.titel = createNotizenDto.titel;
    x.text = createNotizenDto.text;
    x.ps = createNotizenDto.ps;
    return this.notizenRepository.save(x)
  }

  findAll() {
    return this.notizenRepository.find()
  }

  findOne(id: number) {
    return this.notizenRepository.findOne({where: {id}})
  }

  update(id: number, updateNotizenDto: UpdateNotizenDto) {
    return this.notizenRepository.update(id, updateNotizenDto);
  }

  remove(id: number) {
    return this.notizenRepository.delete(id);
  }
}