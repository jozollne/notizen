import { PartialType } from '@nestjs/mapped-types';
import { CreateNotizenDto } from './create-notizen.dto';

export class UpdateNotizenDto extends PartialType(CreateNotizenDto) {}
