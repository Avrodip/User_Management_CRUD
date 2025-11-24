
export const PREDEFINED_ROLES = ["ADMIN", "PERSONAL", "VIEWER"] as const;
export type RoleCode = typeof PREDEFINED_ROLES[number];

export const PREDEFINED_GROUPS = ["GROUP_1", "GROUP_2"] as const;
export type GroupCode = typeof PREDEFINED_GROUPS[number];

export const PREDEFINED_PERMISSIONS = ["CREATE", "VIEW", "EDIT", "DELETE"] as const;
export type Permission = typeof PREDEFINED_PERMISSIONS[number];

export const ROLE_DEFINITIONS = [
  { name: "Admin", code: "ADMIN", permissions: ["CREATE", "VIEW", "EDIT", "DELETE"] },
  { name: "Personal", code: "PERSONAL", permissions: [] },
  { name: "Viewer", code: "VIEWER", permissions: ["VIEW"] },
] as const;
