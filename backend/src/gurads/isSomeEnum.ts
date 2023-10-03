export const isSomeEnum =
  <T>(e: T) =>
  (token: any): token is T[keyof T] =>
    (Object as any).values(e).includes(token as T[keyof T]);
