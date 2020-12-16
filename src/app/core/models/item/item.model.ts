import { Model } from 'src/app/core/models/model';

export class ItemModel extends Model {
  name: string;
  available: boolean;
  currentResponsible: number;
  source: string;
  photo_url: string;
}