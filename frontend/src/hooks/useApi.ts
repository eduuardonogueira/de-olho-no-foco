/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  ICreatePoint,
  IPoint,
  INotification,
  ICreateUser,
  IMapPoint,
} from "@customtypes/index";
import Cookies from "js-cookie";
import { useFiles } from "./useFiles";

export const useApi = () => {
  const { fileToBase64 } = useFiles();

  const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

  const storedAuth = Cookies.get("auth");
  const parsedAuth = JSON.parse(storedAuth || "");
  const accesskey = parsedAuth ? parsedAuth.accessKey : "";

  const authorizationHeader = {
    headers: { Authorization: `Bearer ${accesskey}` },
  };

  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const request = await api.post(`/auth/login`, {
      username: username,
      password: password,
    });
    return request;
  }

  async function getProfile() {
    const request = await api.get(`/auth/profile`, authorizationHeader);
    return request.data;
  }

  async function createUser(user: ICreateUser) {
    try {
      return await api.post("/users/register", user);
    } catch (error: any) {
      if (error.response) return error.response;
      throw error;
    }
  }

  async function createPrivilegedUser(user: ICreateUser) {
    try {
      return await api.post("/users/admin/register", user, authorizationHeader);
    } catch (error: any) {
      if (error.response) return error.response;
      throw error;
    }
  }

  async function getPoint(id: string): Promise<IPoint> {
    const request = await api.get(`/points/${id}`, authorizationHeader);
    return request.data;
  }

  async function getPointsNearby(
    lat: number,
    lng: number,
    maxDistance: number
  ): Promise<IMapPoint[]> {
    const params = {
      lat,
      lng,
      maxDistance,
    };
    try {
      const request = await api.get("/points/nearby", {
        ...authorizationHeader,
        params,
      });
      return request.data;
    } catch (error: any) {
      if (error.response) return error.response;
      throw error;
    }
  }

  async function getAllPoints(): Promise<IPoint[]> {
    const request = await api.get(`/points`, authorizationHeader);
    return request.data;
  }

  async function deletePoint(pointId: string) {
    try {
      return await api.delete(`/points/delete/${pointId}`, authorizationHeader);
    } catch (error: any) {
      if (error.response) return error.response;
      throw error;
    }
  }

  async function createPoint(point: ICreatePoint): Promise<{
    status: number;
    data: IPoint;
  }> {
    const base64Images = point.images
      ? await Promise.all(point.images.map(fileToBase64))
      : "";

    const body = {
      ...point,
      images: base64Images,
    };

    try {
      return await api.post(`/points/create`, body, authorizationHeader);
    } catch (error: any) {
      if (error.response) return error.response;
      throw error;
    }
  }

  async function getUserNotification({
    isRead,
    isDeleted,
    type,
    expiresAt,
  }: {
    isRead: boolean;
    isDeleted: boolean;
    type?: string;
    expiresAt?: Date;
  }): Promise<{
    notifications: INotification[];
    total: number;
  }> {
    const response = await api.get("notifications/global/all/filter", {
      params: {
        isRead,
        isDeleted,
        type,
        expiresAt,
      },
      ...authorizationHeader,
    });
    return response.data;
  }

  return {
    login,
    getProfile,
    createUser,
    createPrivilegedUser,
    getPoint,
    getPointsNearby,
    createPoint,
    deletePoint,
    getAllPoints,
    getUserNotification,
  };
};
