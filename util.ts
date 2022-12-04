import { fromFileUrl, dirname, resolve } from "https://deno.land/std@0.167.0/path/mod.ts";

/*
 * Utils
 */

export function readTextFileFrom(root:string, relativePath: string): Promise<string> {
  const path = resolve(dirname(fromFileUrl(root)), relativePath);

  // TODO: maybe we could handle this as a stream instead of reading into memory all at once
  return Deno.readTextFile(path);
}
