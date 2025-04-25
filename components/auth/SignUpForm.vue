<script setup lang="ts">
import "@ds/Stack";
import "@ds/Card";
import "@ds/Input";
import "@ds/Button";
import "@ds/Banner";

import FIXTURES from "~/constants/fixtures";
import { EMAIL_EXPRESSION, PASSWORD_EXPRESSION } from "~/constants/expressions";

const signedUp = ref(false);
const emailInput = useTemplateRef('emailRef')

const initialFormState = {
  email: {
    value: '',
    touched: false,
  },
  password: {
    value: '',
    touched: false
  },
}

type FieldType = keyof typeof initialFormState;

const formState = reactive({ ...initialFormState })

const resolveFieldError = (fieldType: FieldType, value: string) => {
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

const errors = reactive({
  email: computed(() => (formState.email.touched ? resolveFieldError('email', formState.email.value) : '')),
  password: computed(() => (formState.password.touched ? resolveFieldError('password', formState.password.value) : ''))
})

const touch = (field: string) => {
  formState[field].touched = true
}

const untouch = (field: string) => {
  formState[field].touched = false
}

const resetForm = () => {
  formState.email.value = ''
  formState.password.value = ''
  formState.email.touched = false
  formState.password.touched = false
}

const onSubmit = () => {
  if (!(formState.email.value || formState.password.value) || (errors.email || errors.password)) {
    return
  }

  // TODO: Call sign up API
  signedUp.value = true

  emailInput.value.focus()
  resetForm()
}

watchEffect(() => {
  if (emailInput.value) {
    emailInput.value.focus()
  }
})
</script>

<template>
  <provet-stack style="max-width: 340px; margin: var(--n-space-xl) auto">
    <provet-banner v-if="signedUp" shadow variant="success">{{ FIXTURES.auth.signUp.successMessage }}</provet-banner>
    <provet-card padding="l">
      <form action="#" @submit.prevent="onSubmit">
        <provet-stack>
          <provet-input type="email" id="sign-up-email" name="email" ref="emailRef" label="Email"
            v-model="formState.email.value" @blur="() => touch('email')" @change="() => touch('email')"
            @focus="() => untouch('email')" :error="errors.email" placeholder="user@example.com" expand />
          <provet-input id="sign-up-password" name="password" label="Password" placeholder="••••••••"
            :hint="FIXTURES.auth.passwordHint" v-model="formState.password.value" @blur="() => touch('password')"
            @change="() => touch('password')" @focus="() => untouch('password')" :error="errors.password" expand />
          <provet-button type="submit" variant="primary"
            :disabled="!formState.password.value || !formState.password.value" expand>Sign up</provet-button>
        </provet-stack>
      </form>
    </provet-card>
  </provet-stack>
</template>
