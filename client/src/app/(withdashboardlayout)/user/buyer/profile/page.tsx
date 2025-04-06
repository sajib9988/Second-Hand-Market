// For both profile pages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add form fields or display user information here */}
          <p>Add user profile information here</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add account settings here */}
          <p>Add account settings here</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage