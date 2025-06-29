// Central definition of permission keys to avoid typos across the codebase
export const PERMISSION_CREATE_OWN_CHALLENGE = 'challenges.create_own_challenge';
export const PERMISSION_VIEW_USER_SUMMARIES = 'users.view_user_summaries';

export function hasPermission(
  user: { permissions?: string[] } | null | undefined,
  permission: string,
): boolean {
  return !!user?.permissions?.includes(permission);
}

export function hasAnyPermission(
  user: { permissions?: string[] } | null | undefined,
  permissions: string[],
): boolean {
  return permissions.some((perm) => hasPermission(user, perm));
}
