// import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

export default function LibraryLiked() {
    return (
        <TabsContent value="liked">
        <Card>
          <CardHeader>
            <CardTitle>Liked</CardTitle>
            <CardDescription>
              Your liked content.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    )
}