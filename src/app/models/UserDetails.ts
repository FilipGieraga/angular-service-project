export interface UserDetailsI {
  id: number;
  name?: string;
  surname?: string;
  address?: string;
  email: string;
  phone?: number;
  contactMethod: 'Email' | 'Phone';
  cardDetails?: string;
}
