<script setup lang="ts">
import "@ds/Banner";
import "@ds/Button";
import "@ds/Card";
import "@ds/Checkbox";
import "@ds/Icon";
import "@ds/Input";
import "@ds/Stack";
import "@ds/Tooltip";

import useAuthForm from "@/composables/useAuthForm";
import {signUp} from "@/services/auth.service";
import FIXTURES from "@/constants/fixtures";

interface userMessage {
  type: 'success' | 'warning' | 'danger';
  message: string;
}

const userMessage = ref<userMessage>()
const showPassword = ref(false);
const emailInput = useTemplateRef('emailRef')

const { formState, formErrors, formIsInvalid, resetForm, setTouch } = useAuthForm()

const onSubmit = async () => {
  if (formIsInvalid.value) {
    return
  }

  const response = await signUp({
    email: formState.email.value,
    password: formState.password.value,
    subscribe: formState.subscribe.value
  })

  if(response?.success) {
    userMessage.value = { type: 'success', message: FIXTURES.auth.signUp.successMessage }
    resetForm()
  } else {
    userMessage.value = response?.serviceError ? 
    { type: 'warning', message: FIXTURES.serviceError } 
    : { type: 'danger', message: FIXTURES.auth.signUp.errorMessage }
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
    <provet-banner v-if="userMessage" shadow :variant="userMessage.type">
      {{ userMessage.message }}
    </provet-banner>

    <provet-card padding="l">
      <form action="#" @submit.prevent="onSubmit">
        <provet-stack>

          <provet-input v-model="formState.email.value" type="email" id="sign-up-email" name="email" ref="emailRef"
            label="Email" :error="formErrors.email" placeholder="user@example.com" expand @blur="() => setTouch('email')"
            @input="() => setTouch('email')" @focus="() => setTouch('email', false)" />

          <div :class="['password-input-holder', { 'password-input-holder--with-error': formErrors.password }]">
            <provet-input v-model="formState.password.value" id="sign-up-password" name="password" label="Password"
              placeholder="••••••••" :hint="FIXTURES.auth.passwordHint" @blur="() => setTouch('password')"
              :type="showPassword ? 'text' : 'password'" :error="formErrors.password" expand
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

          <provet-button type="submit" variant="primary" :disabled="formIsInvalid" expand>Sign up</provet-button>
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
