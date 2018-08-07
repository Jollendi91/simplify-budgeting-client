export const required = value => value ? undefined : 'Required';

export const notEmpty = value => value.trim() !== '' ? undefined : 'Cannot be empty';

export const noWhitespace = value => value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const tooSmallUsername = value => value.length > 5 ? undefined : 'Username must be at least 6 characters long';

export const tooLargeUsername = value => value.length <= 30 ? undefined : 'Username must not be longer than 30 characters'

export const tooSmallPassword = value => value.length >= 8 ? undefined : 'Password must be at least 8 characters long';

export const tooLargePassword = value => value.length <= 72 ? undefined : 'Password must not be longer than 72 characters';

export const passwordsMatch = (value, allValues) => value === allValues.password ? undefined : "Passwords don't match";