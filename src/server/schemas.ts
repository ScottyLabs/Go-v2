import { z } from "zod";

export const createRouteSchema = z.object({
  path: z.string(),
  location: z.string(),
  description: z.string(),
  expiration: z.date().nullable(),
});

export const updateRouteSchema = z.object({
  id: z.string(),
  path: z.string(),
  location: z.string(),
  description: z.string(),
  expiration: z.date().nullable(),
});

export const deleteRouteSchema = z.object({
  id: z.string(),
});

export const deleteManyRouteSchema = z.object({
  ids: z.array(z.string()),
});

export const getOneRouteSchema = z.object({
  id: z.string(),
});
