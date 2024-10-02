'use client'

import { UseCurrentUser } from "@/hooks/use-current-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const user = UseCurrentUser()

  if (!user) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {user.id && (
              <div>
                <Label>User ID</Label>
                <p>{user.id}</p>
              </div>
            )}
            {user.name && (
              <div>
                <Label>Name</Label>
                <p>{user.name}</p>
              </div>
            )}
            {user.email && (
              <div>
                <Label>Email</Label>
                <p>{user.email}</p>
              </div>
            )}
            {user.role && (
              <div>
                <Label>Role</Label>
                <p>{user.role}</p>
              </div>
            )}
            {user.plan && (
              <div>
                <Label>Plan</Label>
                <p>{user.plan}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}