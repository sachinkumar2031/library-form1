export const isValidInput = (value: string) => {
  if (value === "") {
    return true;
  }
  if (value.trim() === "") {
    return false; // Reject if the value is empty or only consists of whitespace
  }

  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      value
    )
  ) {
    return false;
  }

  if (value.includes("  ") || value.includes("..")) {
    return false; // Reject if there are consecutive spaces or decimals
  }

  return true; // Accept the input if it meets all the conditions
};

// eslint-disable-next-line
export const isNumber = (val: any) => {
  if (val[val.length - 1] === " ") {
    return false;
  }
  if (val.includes(".")) {
    return false;
  }
  if (/^-\d+(\.\d+)?$/.test(val)) {
    return false;
  }

  if (!isNaN(val?.trim()) || val === "") {
    return true;
  }
  return false;
};

export const isValidTime = (value: string): boolean => {
  return /^(\d|1\d|2[0-3]):[0-5]\d$/.test(value);
};

export function isAlphabetic(input: string): boolean {
  // Allow empty string (so user can delete everything)
  if (input === "") return true;

  // Reject if starts with space
  if (input.startsWith(" ")) return false;

  // Allow only letters and spaces
  return /^[A-Za-z\s]*$/.test(input);
}

export function formatTimeInput(input: string): string {
  // Remove non-numeric characters
  const numbersOnly = input.replace(/\D/g, "");

  // Max 4 digits (HHmm)
  const limited = numbersOnly.slice(0, 4);

  // Insert colon after 2 digits
  if (limited.length <= 2) return limited;
  return `${limited.slice(0, 2)}:${limited.slice(2)}`;
}

export function isOnlyAlphabetic(input: string): boolean {
  if (input === "") return true; // allow empty for deletions
  if (input.startsWith(" ")) return false; // disallow leading space
  return /^[A-Za-z ]+$/.test(input); // only letters and spaces
}
