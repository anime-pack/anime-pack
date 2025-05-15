import { ModeToggle } from '@/components/mode-toggle';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function SettingsAppearence() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appearence</CardTitle>
                <CardDescription>
                    Customize the look of the app.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label className="mb-2">App mode</Label>
                    <ModeToggle />
                </div>
                <p className='mt-5'>More customizations will be available on future updates!</p>
            </CardContent>
        </Card>
    );
}
