import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function SettingsDesktop() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Desktop</CardTitle>
                <CardDescription>Configurations related to app functiolnalities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>In future updates, here you will be able to configure thiings like notifications, storage, and some other system related things.</p>
            </CardContent>
        </Card>
    );
}
