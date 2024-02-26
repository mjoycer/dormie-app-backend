export const createUserValidationSchema = {
  email: {
    isLength: {
      options: {
        min: 5,
        max: 32
      },
      errorMessage: 'The email must be 5-32 characters.',
    },
    notEmpty: {
      errorMessage: 'The email must not be empty.',
    },
    isString: {
      errorMessage: 'The email must be a string.',
    },
  },
  name: {
    notEmpty: true
  }
}