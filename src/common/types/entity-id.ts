import { IsUUID } from 'class-validator';

export class EntityID {
  @IsUUID('4', { message: `Provided ID isn't valid` })
  id: string;
}
