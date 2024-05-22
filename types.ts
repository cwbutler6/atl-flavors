import { Tables } from "./db";

export type User = Tables<"profiles">;
export type Product = Tables<"products"> & {
  created_by: User;
};
