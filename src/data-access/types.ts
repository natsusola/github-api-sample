export interface ListReq {
  name: string;
  params: {
    page: number;
    per_page: number;
  };
}

export interface GetUserReq {
  name: string;
}

export interface User {
  id: string;
  login: string;
  name: string;
  url: string;
  public_repos: number;
}

export interface Repo {
  id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}
