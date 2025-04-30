import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

export default function LibraryHistory() {
    return (
        <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>
              Historic of watched animes.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    )
}