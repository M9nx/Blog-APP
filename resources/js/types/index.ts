import React from 'react';

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

// Additional types for navigation and breadcrumbs
export interface BreadcrumbItem {
  label: string;
  href: string;
  title?: string;
}

export interface NavItem {
  label: string;
  href: string | { url: string }; // Allow for route objects
  title?: string;
  icon?: React.ComponentType;
  url?: string;
}

export interface SharedData {
  [key: string]: unknown;
}
