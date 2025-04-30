import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

export default function SettingsAppearence() {
    return (
        <TabsContent value="appearence">
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
            <div className="space-y-1">
              <Label>Accent color</Label>
              <Input type="color" className="w-[10%]" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    )
}