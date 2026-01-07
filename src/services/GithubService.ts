import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use(
  (config) => {
    const getHeader = AuthService.getAuthHeaders();
    if (getHeader) {
      config.headers.Authorization = getHeader;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await githubApi.get(`/user/repos`, {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });

    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      imageUrl: repo.owner ? repo.owner.avatar_url : null,
      owner: repo.owner ? repo.owner.login : null,
      language: repo.language ? repo.language : null,
    }));

    return repositories;
  } catch (error) {
    console.error("Hubo un error al obtener los repositorios:", error);
    return [];
  }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    const response = await githubApi.post(`/user/repos`, repo);
    console.log("Repositorio creado con éxito:", response.data);
  } catch (error) {
    console.error("Hubo un error al crear el repositorio:", error);
  }
};

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await githubApi.get(`/user`);
    return response.data as UserInfo;
  } catch (error) {
    console.error(
      "Hubo un error al obtener la información del usuario:",
      error
    );
    const userInfo: UserInfo = {
      login: "undefined",
      name: "Usuario no encontrado",
      avatar_url:
        "https://www.shutterstock.com/image-vector/single-icon-user-not-found-260nw-2651872881.jpg",
      bio: "No se pudo obtener la biografía del usuario",
    };
    return userInfo;
  }
};
