export interface Permission {
    _id: string;
    name: string;
    slug: string;
  }
  
  export interface Roles {
    _id: string;
    name: string;
    slug: string;
    permissions: Permission[];
  }
  