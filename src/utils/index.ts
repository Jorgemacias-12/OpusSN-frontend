import type { LoginData, NewUser } from "@/types";

export const getUserAvatarURL = (name: string, lastname: string): string => {
  return `https://ui-avatars.com/api/?name=${name}+${lastname}&background=random`
}

export const isValidEmail = (value: string) => {
  return value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export const isValidUsername = (value: string) => {
  const regex = /^[a-zA-Z0-9_]{3,15}$/;

  return regex.test(value);
}

export const convertToNewUser = (formData: FormData): NewUser | null => {
  const data: { [key: string]: string } = {}

  formData.forEach((value, key) => {

    // If the value is file ignore it
    if (value instanceof File) {
      return;
    }

    data[key] = String(value);
  })

  return {
    Name: data.Name || '',
    LastName: data.LastName || '',
    UserName: data.UserName || '',
    Email: data.Email || '',
    Password: data.Password || '',
    Role: parseInt(data.Role) || 0
  }
}

export const convertToLoginData = (formData: FormData): LoginData | null => {
  const data: { [key: string]: string } = {}

  formData.forEach((value, key) => {
    if (value instanceof File) {
      return;
    }

    data[key] = String(value);
  })

  return {
    Email: data.Email || '',
    Password: data.Password || ''
  }
}