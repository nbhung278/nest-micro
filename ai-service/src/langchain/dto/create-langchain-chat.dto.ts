import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLangchainChatDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
