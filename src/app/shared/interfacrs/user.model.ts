export interface User{
    name?: any;
    id: number, 
    userId?: string;
    customerId?: number;
    username?: string;
    email?:string;
    firstName?: string;
    lastName?: string;
    active?: boolean;
    loginmode?:string;
    projects?: string[];
    avatarUrl?:string;
    fullName?: string
  }