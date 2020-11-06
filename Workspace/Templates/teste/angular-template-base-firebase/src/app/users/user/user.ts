import { Model } from 'src/app/core/models/model';

export class UserModel extends Model {
  andress?: _Andress;
  name: string;
  email: string;
  birth_date: Date;
  cpf: string;
  idade: number;
  password: string;
  phone_number: string;
  role: string;
  sex: string;
}

class _Andress extends Model {
  andress: string;
  complement: string;
  number: number;
  postal_code: string;
}
