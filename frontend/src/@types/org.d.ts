type getOrgUsersResponse = {
  results: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

type UserForm = {
  name: string;
  email: string;
  role: string;
  password: string;
};
