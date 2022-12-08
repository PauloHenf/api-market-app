export interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ISendForgotPasswordEmailServiceRequest {
  email: string;
}

export interface IResetPasswordServiceRequest {
  token: string;
  password: string;
}
