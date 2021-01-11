import { Model } from 'src/app/core/models/model';

export class ItemModel extends Model {
  name: string;
  available: boolean;
  current_responsible: _user;
  user_in_possession: _user;
  source: string;
  photo_url: string;
}
class _user extends Model {
  name: string;
  id_user: string;
}