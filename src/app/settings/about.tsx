import { invoke } from "@tauri-apps/api/core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { GithubIcon } from "lucide-react";

export default function SettingsAbout() {
    return (
        <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>
              Some app info.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Socials</Label>
              <GithubIcon onClick={
                () => {
                    invoke('open_url', { url: "https://github.com/dark1zinn/anime-pack" })
                }
              } className="size-7" />
              <h3>Github</h3>
            </div>
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    )
}