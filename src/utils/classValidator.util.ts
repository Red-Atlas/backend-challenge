import { validate } from "class-validator";

async function validateInput(input, DTO) {
  try {
    const result = Object.assign(new DTO(), input);

    const errors = await validate(result);

    if (errors.length > 0) {
      const error = new Error("Datos invalidos");
      error["data"] = errors;

      throw error;
    }

    return result;
  } catch (error) {
    throw error;
  }
}

export default validateInput;
