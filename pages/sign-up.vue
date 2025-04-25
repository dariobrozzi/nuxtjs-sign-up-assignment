<script setup lang="ts">
import "@ds/Stack";
import SignUpForm from "@/components/auth/SignUpForm.vue";
import FIXTURES from "~/constants/fixtures";
</script>

<template>
  <provet-stack direction="vertical" justify-content="center" align-items="center" style="min-height: 60vh">
    <h1>Sign up to {{ FIXTURES.appName }}</h1>
    <SignUpForm />
  </provet-stack>
</template>
