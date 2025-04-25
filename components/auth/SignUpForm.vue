<script setup lang="ts">
import "@ds/Stack";
import "@ds/Card";
import "@ds/Input";
import "@ds/Button";
import "@ds/Banner";

import FIXTURES from "~/constants/fixtures";

const signedUp = ref(false);
const usernameInput = useTemplateRef('usernameRef')

watchEffect(() => {
  if (usernameInput.value) {
    usernameInput.value.focus()
  }
})
</script>
<template>
  <provet-stack style="max-width: 340px; margin: var(--n-space-xl) auto">
    <provet-banner v-if="signedUp" shadow variant="success">{{ FIXTURES.auth.signUp.successMessage }}</provet-banner>
    <provet-card padding="l">
      <form action="#">
        <provet-stack>
          <provet-input type="email" id="sign-up-username" name="username" ref="usernameRef" label="Username"
            placeholder="user@example.com" expand required hide-required />
          <provet-input id="sign-up-password" name="password" label="Password" expand required placeholder="••••••••" />
          <provet-button type="submit" variant="primary" expand>Sign up</provet-button>
        </provet-stack>
      </form>
    </provet-card>
  </provet-stack>
</template>
