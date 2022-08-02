import { IsUUID } from 'class-validator';
import { ApiPath } from '../constants/constants';

export class EntityID {
  @IsUUID('4', { message: `Provided ID isn't valid UUID` })
  id: string;
}

export class FavsEntity extends EntityID {
  entity: ApiPath.albums | ApiPath.artists | ApiPath.tracks;
}
