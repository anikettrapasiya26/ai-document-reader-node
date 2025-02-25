export interface objResponseType {
  success: boolean;
  message: string;
  data: datatype | datatype[];
}

export interface datatype {
  title: string;
  message: string;
}
