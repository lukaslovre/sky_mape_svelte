import { z } from "zod";
import type { InputValidator } from "../../types";

export const validators: Record<string, InputValidator> = {
  imageSizeValidator: (value: File | undefined) => {
    const maxSizeMb = 10;

    if (value && value.size > maxSizeMb * 1024 * 1024) {
      return `Image size must be less than ${maxSizeMb}MB (current size: ${
        value.size / 1024 / 1024
      }MB)`;
    }
    return null;
  },

  numberValidator: (value: string) => {
    if (!z.number().safeParse(value).success) {
      return "Value must be a number";
    }
    return null;
  },

  urlValidator: (value: string) => {
    if (!z.string().url().safeParse(value).success) {
      return "Value must be a valid URL";
    }
    return null;
  },

  emailValidator: (value: string) => {
    if (!z.string().email().safeParse(value).success) {
      return "Value must be a valid email";
    }
    return null;
  },
};
