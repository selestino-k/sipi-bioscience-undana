import { revalidateTag } from 'next/cache';

export async function invalidateUserRoleCache() {
  revalidateTag('user-role');
}