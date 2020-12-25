import { Model } from 'src/app/core/models/model';

export class ItemModel extends Model {
  name: string;
  available: boolean;
  currentResponsible: _currentResponsible;
  source: string;
  photo_url: string;
}
class _currentResponsible extends Model {
  name: string;
  idUser: string;
}