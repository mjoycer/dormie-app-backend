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
  },
  password: {
    notEmpty: true
  }
}

export const userLoginValidationSchema = {
  email: {
    isLength: {
      options: {
        min: 5,
        max:32,
      },
      errorMessage: 'The email must be 5-32 characters.',
    },
    notEmpty: {
      errorMessage: 'The email must not be empty.'
    },
    isEmail: {
      errorMessage: 'Invalid Email.'
    }
  }
}

export const createNoteSchema = {
  message: {
    isLength: {
      options: {
        max: 140
      },
      errorMessage: 'Note should not have more than 140 characters.'
    },
    isString: {
      errorMessage: 'Note should be a string.'
    }
  }
}