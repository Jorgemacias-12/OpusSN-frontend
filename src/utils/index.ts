import type { CommentData, LoginData, NewPost, NewUser } from "@/types";

export const getUserAvatarURL = (name: string, lastname: string): string => {
  return `https://ui-avatars.com/api/?name=${name}+${lastname}&background=random`
}

export const isValidEmail = (value: string) => {
  return value.match(
    /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
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

export const convertToCommentData = (formData: FormData): CommentData | null => {
  const data: { [key: string]: string } = {}

  formData.forEach((value, key) => {
    if (value instanceof File) {
      return;
    }

    data[key] = String(value);

    console.log(`k: ${key} ? v: ${value}`)
  });

  return {
    Content: data.Content || '',
    postId: parseInt(data.postId),
    userId: parseInt(data.userId),
  }
}

export const convertToPostData = (formData: FormData): NewPost | null => {
  const data: { [key: string]: string } = {}

  formData.forEach((value, key) => {
    if (value instanceof File) {
      return;
    }

    data[key] = String(value);
  })

  const d = new Date();

  return {
    Title: data.Title || '',
    Content: data.Content || '',
    CreationDate: d,
    User: parseInt(data.User),
    Categories: JSON.parse(data.Categories)
  }
}

export const userExists = async (username: string): Promise<boolean> => {
  const apiURL = process.env.NODE_ENV === 'production'
    ? `http://${process.env.API_URL}` || ''
    : 'http://localhost:4000'

  const apiReq = `${apiURL}/users?UserName=${encodeURIComponent(username)}&CheckIfExists=true`

  try {
    const response = await fetch(apiReq);

    const { isAvailable } = await response.json();

    return isAvailable;
  }
  catch (err) {
    throw err;
  }
}

export const getAspectRatioClass = (width: number, height: number): string => {
  const aspectRatio = height > width ? 'portrait' : 'square';
  return `aspect-${aspectRatio}`;
}

export const getAPIURL = (): string => {
  return import.meta.env.PUBLIC_API_URL ?? 'localhost:4000/';
}

export const getTimeDifferenceString = (date: Date) => {
  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const VALUE_TO_CHECK = 0;
  const THRESHOLD_VALUE = 1;

  const now = new Date();

  const differenceInMillis = now.getTime() - date.getTime();

  const seconds = Math.floor(differenceInMillis / MILLISECONDS_PER_SECOND);
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const days = Math.floor(hours / HOURS_PER_DAY);

  let result = "";

  if (seconds > VALUE_TO_CHECK && result !== '') {
    result = `${seconds} segundo${seconds > THRESHOLD_VALUE ? 's' : ''} `
  }

  if (minutes > VALUE_TO_CHECK && result !== '') {
    result = `${minutes} minuto${minutes > THRESHOLD_VALUE ? 's' : ''} `
  }

  if (hours > VALUE_TO_CHECK && result !== '') {
    result = `${hours} hora${hours > THRESHOLD_VALUE ? 's' : ''} `
  }

  if (days > VALUE_TO_CHECK) {
    result = `${days} día${days > THRESHOLD_VALUE ? 's' : ''} `
  }

  return `Hace ${result.trim()}`;
}