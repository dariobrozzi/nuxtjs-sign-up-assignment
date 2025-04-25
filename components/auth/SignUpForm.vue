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

const invalidForm = computed(() => (!formState.email.value || !formState.password.value || errors.email != '' || errors.password != ''))

const setTouch = (field: string, state: boolean = true) => {
  formState[field].touched = state;
};

const resetForm = () => {
  formState.email.value = '';
  formState.email.touched = false;
  formState.password.value = '';
  formState.password.touched = false;
  formState.subscribe.value = false;
};

const onSubmit = async () => {
  if (invalidForm.value) {
    return
  }

  const body = {
    email: formState.email.value,
    password: formState.password.value,
    subscribe: formState.subscribe.value
  }

  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body
    }).then((response) => {
      if (response.statusCode === 200) {
        signedUp.value = true
        resetForm()
      } else {
        throw new Error(FIXTURES.auth.signUp.errorMessage)
      }
    })
  } catch (error) {
    // TODO: Display error message to the user (maybe using existent banner)
    console.error('Sign up failed:', error);
  }
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

let firstRender = true

watchEffect(() => {
  if (emailInput.value && firstRender) {
    emailInput.value.focus()
    // prevent focus on re-render
    firstRender = false
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
            label="Email" :error="errors.email" placeholder="user@example.com" expand @blur="() => setTouch('email')"
            @input="() => setTouch('email')" @focus="() => setTouch('email', false)" />

          <div :class="['password-input-holder', { 'password-input-holder--with-error': errors.password }]">
            <provet-input v-model="formState.password.value" id="sign-up-password" name="password" label="Password"
              placeholder="••••••••" :hint="FIXTURES.auth.passwordHint" @blur="() => setTouch('password')"
              :type="showPassword ? 'text' : 'password'" :error="errors.password" expand
              @input="() => setTouch('password')" @focus="() => setTouch('password', false)" />

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

          <provet-button type="submit" variant="primary" :disabled="invalidForm" expand>Sign up</provet-button>
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
