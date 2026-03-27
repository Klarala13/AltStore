declare module "crypto" {
  export function randomBytes(size: number): { toString(encoding: string): string };
  export function scryptSync(
    password: string,
    salt: string,
    keylen: number
  ): { toString(encoding: string): string };
}

declare const process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
};
