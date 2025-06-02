<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        Welcome Back
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        Enter your email below to login to your account
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-3">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="goku@animepack.net" required />
      </div>
      <div class="grid gap-3">
        <div class="flex items-center">
          <Label for="password">Password</Label>
          <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" class-name="w-full">
        Login
      </Button>
    </div>
  </form>
  <div
    class="after:border-border my-3 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
    <span class="bg-background/50 rounded-md text-muted-foreground relative z-10 px-2">
      Or continue with
    </span>
  </div>
  <div class="flex flex-col gap-3">
    <Button variant="outline" class-name="w-full">
      <span class="flex flex-row gap-3">
        <Icon icon="fa6-brands:discord" class="size-5.5" />
        Login with Discord
      </span>
    </Button>
    <Button variant="outline" class-name="w-full">
      <span class="flex flex-row gap-3">
        <Icon icon="fa6-brands:google" class="size-5" />
        Login with Google
      </span>
    </Button>
    <div class="text-center text-sm">
      Don't have an account?
      <a href="#" @click="$emit('toggleSignup')" class="underline underline-offset-4">
        Sign up
      </a>
    </div>
  </div>
</template>
