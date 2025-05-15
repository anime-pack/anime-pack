import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function LibraryLiked() {
    return (
        <Card className="w-full h-fit">
            <CardHeader>
                <CardTitle>Liked</CardTitle>
                <CardDescription>Your liked content.</CardDescription>
            </CardHeader>
        </Card>
    );
}
