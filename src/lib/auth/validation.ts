const usernamePattern = /^[a-zA-Z0-9._-]{3,30}$/;

export function validatePasswordStrength(password: string) {
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number.';
  }
  return null;
}

export function validateUsername(username: string) {
  if (!usernamePattern.test(username)) {
    return 'Username must be 3-30 chars and use letters, numbers, dot, underscore, or hyphen.';
  }
  return null;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getFirstName(fullName: string | null, fallback: string) {
  if (!fullName) return fallback;
  const first = fullName.trim().split(/\s+/)[0];
  return first || fallback;
}
