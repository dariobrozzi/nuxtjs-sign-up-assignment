import { EMAIL_EXPRESSION, PASSWORD_EXPRESSION } from "@/constants/expressions";
import FIXTURES from "@/constants/fixtures";

export interface FormState {
  email: {
    value: string;
    touched: boolean;
  },
  password: {
    value: string;
    touched: boolean;
  },
  subscribe: {
    value: boolean;
  }
}

const useAuthForm = () => {
  const initialFormState: FormState = {
    email: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false
    },
    subscribe: {
      value: false,
    }
  }

  const formState = reactive({ ...initialFormState })

  type ValidateFieldType = 'email' | 'password';

  const resolveFieldError = (fieldType: ValidateFieldType, value: string) => {
    const fieldExpression = {
      email: EMAIL_EXPRESSION,
      password: PASSWORD_EXPRESSION
    }

    if (!value) {
      return FIXTURES.field.required
    }

    if (!fieldExpression[fieldType].test(value)) {
      return FIXTURES.field.invalid
    }

    return ''
  }

  const formErrors = reactive({
    email: computed(() => (formState.email.touched ? resolveFieldError('email', formState.email.value) : '')),
    password: computed(() => (formState.password.touched ? resolveFieldError('password', formState.password.value) : ''))
  })

  const formIsInvalid = computed(() => (!formState.email.value || !formState.password.value || formErrors.email != '' || formErrors.password != ''))

  const setTouch = (field: ValidateFieldType, state: boolean = true) => {
    formState[field].touched = state;
  };

  const resetForm = () => {
    formState.email.value = '';
    formState.email.touched = false;
    formState.password.value = '';
    formState.password.touched = false;
    formState.subscribe.value = false;
  };

  return { formState, formErrors, formIsInvalid, setTouch, resetForm }
}

export default useAuthForm