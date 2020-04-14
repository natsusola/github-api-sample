import { apiClient } from './axios';
import { ListReq, GetUserReq, User, Repo } from './types';

function listRepo(payload: ListReq): Promise<Repo[]> {
  return apiClient.get(`/users/${payload.name}/repos`, {
    params: payload.params,
  });
}

function getUser(payload: GetUserReq): Promise<User> {
  return apiClient.get(`/users/${payload.name}`);
}

export const apiGithub = {
  listRepo,
  getUser,
};
