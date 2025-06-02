<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DesktopSection, AppearanceSection, AboutSection } from '@/components/layout/Settings';
</script>

<template>
    <div className="flex flex-1 justify-center px-4 pt-4">
        <Tabs defaultValue="desktop" className="w-full align-top">
            <TabsList className="grid w-full grid-cols-3 gap-0.5 mb-3">
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                <TabsTrigger value="appearence">Appearence</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="desktop">
                <DesktopSection />
            </TabsContent>
            <TabsContent value="appearence">
                <AppearanceSection />
            </TabsContent>
            <TabsContent value="about">
                <AboutSection />
            </TabsContent>
        </Tabs>
    </div>
</template>