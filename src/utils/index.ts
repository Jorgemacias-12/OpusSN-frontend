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

export const ofuscateEmail = (email: string) => {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
    return email;
  }

  const user = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  const firstChar = user.charAt(0);

  const obfuscatedUser = firstChar + "*".repeat(user.length - 1);

  const domainParts = domain.split(".");

  const topLevelDomain = domainParts.pop() || '';
  const obfuscatedDomainParts = domainParts.map(part => "*".repeat(part.length));

  const obfuscatedDomain = obfuscatedDomainParts.join(".") + "." + topLevelDomain;

  const obfuscatedEmail = `${obfuscatedUser}@${obfuscatedDomain}`;

  return obfuscatedEmail;
}

export const replaceAt = (value: string, index: number, replacement: string) => {
  return value.substring(0, index) + replacement + value.substring(index + replacement.length);
}

export const UserNameIsAvailable = async (username: string, signal: AbortSignal): Promise<boolean> => {
  const apiURL = `${getAPIURL()}/users?UserName=${encodeURIComponent(username)}&CheckIfExists=true`

  console.trace(apiURL);

  try {
    const response = await fetch(apiURL, { signal });

    console.trace(response)

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data.isAvailable;
  }
  catch (error) {
    console.error(error)
    return false;
  }
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
  const THRESHOLD_VALUE = 1;

  const now = new Date();

  const differenceInMillis = now.getTime() - date.getTime();

  const seconds = Math.floor(differenceInMillis / MILLISECONDS_PER_SECOND);
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const days = Math.floor(hours / HOURS_PER_DAY);

  let result = "";

  if (seconds == 0) {
    return "Ahora";
  }

  if (seconds < SECONDS_PER_MINUTE) {
    return result = `Hace ${seconds} segundo${seconds > THRESHOLD_VALUE ? 's' : ''}`
  }

  if (minutes < MINUTES_PER_HOUR) {
    return result = `Hace ${minutes} minuto${minutes > THRESHOLD_VALUE ? 's' : ''}`
  }

  if (hours < HOURS_PER_DAY) {
    return result = `Hace ${hours} hora${hours > THRESHOLD_VALUE ? 's' : ''}`
  }

  if (hours > HOURS_PER_DAY && days !== 0) {
    return result = `Hace ${days} día${days > THRESHOLD_VALUE ? 's' : ''}`;
  }
}
