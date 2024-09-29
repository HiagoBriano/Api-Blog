// T = tipo de dado que a função irá retornar
// K = tipo de dado que a função irá receber

export interface IGenericProps<T, K> {
  table?: string;
  id?: string;
  data?: T | T[];
  select?: K;
  include?: object;
  orderBy?: object;
  where?: object;
}

export interface IRepository<T, K> {
  getAll(props: IGenericProps<T, K>): Promise<T[]>;
  getById(props: IGenericProps<T, K>): Promise<T | null>;
  findUnique(props: IGenericProps<T, K>): Promise<T | null>;
  create(props: IGenericProps<T, K>): Promise<T>;
  update(props: IGenericProps<T, K>): Promise<T>;
  delete(props: IGenericProps<T, K>): Promise<T>;
}
