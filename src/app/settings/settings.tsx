import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import SettingsDesktop from './desktop';
import SettingsAppearence from './appearence';
import SettingsAbout from './about';

export default function Settings() {
    const location = useLocation();
    const [defaultView] = location.pathname.split('/').slice(-1);

    useEffect(() => {}, [defaultView]);

    return (
        <div className="flex flex-1 justify-center px-4 pt-4">
            <Tabs defaultValue={defaultView} className="w-full align-top">
                <TabsList className="grid w-full grid-cols-3 gap-0.5">
                    <TabsTrigger value="desktop">Desktop</TabsTrigger>
                    <TabsTrigger value="appearence">Appearence</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>
                <TabsContent value="desktop">
                    <SettingsDesktop />
                </TabsContent>
                <TabsContent value="appearence">
                    <SettingsAppearence />
                </TabsContent>
                <TabsContent value="about">
                    <SettingsAbout />
                </TabsContent>
            </Tabs>
        </div>
    );
}
