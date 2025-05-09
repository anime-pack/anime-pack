import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { User } from 'lucide-react';
import { Link } from 'react-router';
import DiscordLogo from '@/assets/DiscordLogo';
import GoogleLogo from '@/assets/GoogleLogo';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className="bg-zinc-500/40 backdrop-blur backdrop-opacity-55">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription className="text-accent-foreground">
                        Login with your Discord or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Link
                                    to="/"
                                    className="bg-zinc-500/50 rounded-md"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full border-2 hover:border-5"
                                    >
                                        <DiscordLogo className="size-5 stroke-0" />
                                        Login with Discord
                                    </Button>
                                </Link>
                                <Link
                                    to="/"
                                    className="bg-zinc-500/50 rounded-md"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full border-2 hover:border-5"
                                    >
                                        <GoogleLogo />
                                        Login with Google
                                    </Button>
                                </Link>
                                <Link
                                    to="/"
                                    className="bg-zinc-500/50 rounded-md"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full border-2 hover:border-5"
                                    >
                                        <User className="size-5" />
                                        Continue as Guest
                                    </Button>
                                </Link>
                            </div>
                            {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div> */}
                        </div>
                    </form>
                    <div className="text-accent-foreground/60 mt-7 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        By continuing, you agree to our{' '}
                        <a href="#">Terms of Service</a> and{' '}
                        <a href="#">Privacy Policy</a>.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
