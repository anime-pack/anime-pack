import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function LibraryHistory() {
    return (
        <Card className='w-full h-fit'>
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Historic of watched animes.</CardDescription>
            </CardHeader>
        </Card>
    );
}
