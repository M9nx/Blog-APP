export interface User {
  id: number;
  name: string | null;
  email: string;
  username?: string | null;
  bio?: string | null;
  avatar?: string | null;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};

export type Appearance = 'light' | 'dark' | 'system';
