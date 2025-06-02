<script setup lang="ts">
import ThemeToggler from '@/components/ThemeToggler.vue';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Appearence</CardTitle>
            <CardDescription>
                Customize the look of the app.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
            <div className="space-y-1">
                <Label className="mb-2">App mode</Label>
                <ThemeToggler />
            </div>
            <p className='mt-5'>More customizations will be available on future updates!</p>
        </CardContent>
    </Card>
</template>
