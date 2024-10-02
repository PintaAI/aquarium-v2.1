import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { login } from '@/actions/login';
import { register } from '@/actions/register';
import { UserRoles } from '@prisma/client';

interface AuthCardProps {
  mode?: 'login' | 'register';
}

function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={pending}>
      {pending ? 'Submitting...' : isLogin ? 'Sign In' : 'Register'}
    </Button>
  );
}

const AuthCard = ({ mode = 'login' }: AuthCardProps) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [role, setRole] = useState<UserRoles>(UserRoles.MURID);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleAuth = () => {
    const callbackUrl = isLogin ? '/' : '/auth/complete-registration';
    signIn('google', { callbackUrl, state: { role } });
  };

  const handleModeSwitch = () => {
    if (isLogin) {
      router.push('/auth/register');
    } else {
      router.push('/auth/sign-in');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      setError('Invalid email or password');
      return;
    }

    if (isLogin) {
      const result = await login({ email, password });

      if ('error' in result) {
        setError(result.error || 'An unexpected error occurred during login');
      } else if ('success' in result) {
        setSuccess(result.success);
        if (result.shouldRefresh) {
          // Refresh the page to update the session
          window.location.href = result.redirectTo || '/';
        } else if (result.redirectTo) {
          router.push(result.redirectTo);
        }
      }
    } else {
      const name = formData.get('name');
      if (typeof name !== 'string') {
        setError('Invalid name');
        return;
      }

      const result = await register({ email, password, name, role });

      if ('error' in result) {
        setError(typeof result.error === 'string' ? result.error : 'An unexpected error occurred during registration');
      } else {
        setSuccess('Registration successful. Please sign in.');
        setTimeout(() => router.push('/auth/sign-in'), 2000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</CardTitle>
          <CardDescription className="text-center">{isLogin ? 'Sign in to your account' : 'Create a new account'}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => setRole(value as UserRoles)} defaultValue={UserRoles.MURID}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRoles.GURU}>Guru</SelectItem>
                      <SelectItem value={UserRoles.MURID}>Murid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <SubmitButton isLogin={isLogin} />
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <Button onClick={handleGoogleAuth} type="button" variant="outline" className="w-full">
              <FaGoogle className="mr-2" />
              {isLogin ? 'Sign in' : 'Register'} with Google
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={handleModeSwitch}
                type="button"
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default AuthCard;