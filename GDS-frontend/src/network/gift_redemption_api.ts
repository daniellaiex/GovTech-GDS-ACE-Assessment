import { Staff } from "../models/staff";
import { Redeem } from "../models/redeem";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchStaff(): Promise<Staff[]> {
  const response = await fetchData("/api/staff", { method: "GET" });
  return response.json();
}

export async function fetchRedeem(): Promise<Redeem[]> {
  const response = await fetchData("/api/redeem", { method: "GET" });
  return response.json();
}

export async function updateRedeemStatus(teamName: string): Promise<Redeem[]> {
  const response = await fetchData("/api/redeem/" + teamName, { method: "PATCH" });
  return response.json();
}

export async function getStaffById(staffPassId: string): Promise<Staff[]> {
  const response = await fetchData(`/api/staff/${staffPassId}`);
  return response.json();
}