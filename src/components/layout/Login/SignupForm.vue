<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/vue'
import { Checkbox } from '@/components/ui/checkbox'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const acceptedTerms = ref(false)

const handleSubmit = (e: Event) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    if (form.checkValidity()) {
        if (!acceptedTerms.value) {
            toast.warning('Por favor, aceite os termos de serviço para continuar')
        }
        return
    }

    // TODO: handle form submission
}
</script>

<template>
    <form @submit="handleSubmit" :class="cn('flex flex-col gap-6')">
        <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">
                Create a account
            </h1>
            <p class="text-balance text-sm text-muted-foreground">
                Enter your email below to create your account
            </p>
        </div>
        <div class="grid gap-6">
            <div class="grid gap-2">
                <Label for="username">Username</Label>
                <Input id="username" type="username" placeholder="Vegeta" required />
            </div>
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="goku@animepack.net" required />
            </div>
            <div class="grid gap-2">
                <div class="flex items-center">
                    <Label for="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
                <div class="flex items-center space-x-2 pt-2">
                    <Checkbox id="terms" v-model="acceptedTerms" required />
                    <Label for="terms" class="text-sm text-muted-foreground">
                        I agree to the
                        <a href="#" class="underline underline-offset-4">Terms of Service</a>
                        and
                        <a href="#" class="underline underline-offset-4">Privacy Policy</a>
                    </Label>
                </div>
            </div>
            <Button type="submit" class="w-full">
                <span class="flex flex-row items-center gap-3">
                    <Icon icon="fa6-brands:discord" class="size-5.5" />
                    Signup with Discord
                </span>
            </Button>
            <Button type="submit" variant="outline" class="w-full">
                <span class="flex flex-row items-center gap-3">
                    <Icon icon="fa6-brands:google" class="size-5" />
                    Signup with Google
                </span>
            </Button>
            <Button type="submit" variant="outline" class="w-full">
                Create an account
            </Button>
        </div>
        <div class="text-center text-sm">
            Already have an account?
            <a href="#" @click="$emit('toggleSignup')" class="underline underline-offset-4">
                Sign in
            </a>
        </div>
    </form>
</template>
