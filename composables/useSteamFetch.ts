export default async function <T>(url: string) {
  try {
    return await $fetch<T>(url);
  } catch (Error) {
    return undefined;
  }
}
