const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
} as const;

type TUserRole = keyof typeof USER_ROLE;
