export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}

export type PhoneType = 'CELULAR' | 'RESIDENCIAL';