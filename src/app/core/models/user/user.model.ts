import { Model } from 'src/app/core/models/model';

export class UserModel extends Model {
  name: string;
  matriculation: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
  itens_responsible: _itens[];
}
class _itens extends Model{
  name: string;
  idItem: string;
}