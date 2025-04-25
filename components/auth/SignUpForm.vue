<script setup lang="ts">
import "@ds/Banner";
import "@ds/Button";
import "@ds/Card";
import "@ds/Checkbox";
import "@ds/Icon";
import "@ds/Input";
import "@ds/Stack";
import "@ds/Tooltip";

import FIXTURES from "~/constants/fixtures";
import { EMAIL_EXPRESSION, PASSWORD_EXPRESSION } from "~/constants/expressions";

const signedUp = ref(false);
const showPassword = ref(false);
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
  subscribe: {
    value: false,
    touched: false
  }
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

  // TODO: Call to sign-up API and manage the response
  signedUp.value = true

  emailInput.value.focus()
  resetForm()
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

watchEffect(() => {
  if (emailInput.value) {
    emailInput.value.focus()
  }
})
</script>

<template>
  <provet-stack style="max-width: 340px; margin: var(--n-space-xl) auto">
    <provet-banner v-if="signedUp" shadow variant="success">
      {{ FIXTURES.auth.signUp.successMessage }}
    </provet-banner>

    <provet-card padding="l">
      <form action="#" @submit.prevent="onSubmit">
        <provet-stack>

          <provet-input v-model="formState.email.value" type="email" id="sign-up-email" name="email" ref="emailRef"
            label="Email" :error="errors.email" placeholder="user@example.com" expand @blur="() => touch('email')"
            @change="() => touch('email')" @focus="() => untouch('email')" />

          <div :class="['password-input-holder', { 'password-input-holder--with-error': errors.password }]">
            <provet-input v-model="formState.password.value" id="sign-up-password" name="password" label="Password"
              placeholder="••••••••" :hint="FIXTURES.auth.passwordHint" @blur="() => touch('password')"
              :type="showPassword ? 'text' : 'password'" :error="errors.password" expand
              @change="() => touch('password')" @focus="() => untouch('password')" />

            <provet-button square size="s" aria-describedby="tooltip" @click="() => toggleShowPassword()"
              class="reveal-password-button">
              <provet-icon :name="`interface-edit-${showPassword ? 'off' : 'on'}`" />
            </provet-button>

            <provet-tooltip id="tooltip" position="inline-end">
              {{ `${showPassword ? 'Hide' : 'Reveal'} password` }}
            </provet-tooltip>
          </div>

          <provet-checkbox v-model="formState.subscribe.value" type="checkbox" id="sign-up-subscribe" name="subscribe"
            size="s" :label="FIXTURES.auth.signUp.subscribeCheckbox" value="Value"></provet-checkbox>

          <provet-button type="submit" variant="primary"
            :disabled="!formState.password.value || !formState.password.value" expand>Sign up</provet-button>
        </provet-stack>
      </form>
    </provet-card>
  </provet-stack>
</template>

<style scoped>
.password-input-holder {
  position: relative;
}

.reveal-password-button {
  position: absolute;
  right: calc(var(--n-space-s)/2);
  bottom: calc(var(--n-space-s)/2);
}

.password-input-holder--with-error .reveal-password-button {
  /* input internal spacing + error caption */
  bottom: calc(var(--n-space-s) + var(--n-space-s) + var(--n-font-size-s));
}
</style>
