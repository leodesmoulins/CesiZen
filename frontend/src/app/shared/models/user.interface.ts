export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
}
