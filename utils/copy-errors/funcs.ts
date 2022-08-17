export function isNotFound(err: unknown) {
  return err instanceof Deno.errors.NotFound || (<Error>err).message.includes('os error 123')
}
