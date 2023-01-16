export interface IClaims {
  cs?: string[];
  admin?: string[];
}

export interface IdpUser {
  id: string;
  email: string;
  claims?: IClaims;
  isEnabled: boolean;
}

export interface ICreateUserRequest {
  email: string;
  password: string;
  phone: string;
  emailVerified?: boolean;
  claims: IClaims;
}

export interface IUpdateUserRequest {
  email?: string | null;
  password?: string | null;
  claims?: IClaims | null;
  isEnabled?: boolean;
}

export interface IIdentityProviderService {
  createUser(request: ICreateUserRequest): Promise<IdpUser>;
  getUserById(id: string): Promise<IdpUser | null>;
  getUserByEmail(email: string): Promise<IdpUser | null>;
  updateUser(id: string, request: IUpdateUserRequest): Promise<void>;
  verifyIDToken(token: string): Promise<{ uid: string; permissions: string[] }>;
  generatePasswordResetEmailLink(email: string): Promise<string>;
  generateEmailVerificationLink(email: string): Promise<string>;
}
