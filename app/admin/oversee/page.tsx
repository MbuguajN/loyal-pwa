'use client'
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Store, Admin, User, Franchise } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
type AdminWithUser = Admin & { user: User }
type StoreWithAdmins = Store & { admins: AdminWithUser[] }
export default function ManageAdminsPage() {

  const { toast } = useToast();
  const { data: session } = useSession();
  const getStoreAdminsQuery = useQuery({
    queryFn: async () => {
      if (session?.user?.email) {
        try {
          const formData = new FormData()
          formData.append("email", session?.user?.email)
          const req = await fetch("/api/admin/get-store-admins", { method: "POST", body: formData })
          const data = await req.json() as { store: StoreWithAdmins & { franchise: Franchise } }
          return data
        } catch (e) {
          console.error(e)

        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error Obtaining Email",
        });


      }
    }, queryKey: [`${session?.user?.email}`]
  })
  return (
    <div className="p-6 w-1/2">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Administrators</h1>
            <p className="text-muted-foreground">Manage {getStoreAdminsQuery?.data?.store?.franchise?.name} {getStoreAdminsQuery?.data?.store?.location} admins </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/admins/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Admin
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Administrators</CardTitle>
            <CardDescription>A list of all administrators with access to the loyalty program dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            {getStoreAdminsQuery?.isLoading ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <Table>
                <TableCaption>Admins</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>

                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getStoreAdminsQuery?.data?.store?.admins?.map((admin) => {
                    return (
                      <TableRow key={admin.id}>
                        <TableCell>{admin?.user?.name}</TableCell>

                        <TableCell>{admin?.user?.name}</TableCell>
                      </TableRow>

                    )
                  })}</TableBody>
                <TableFooter></TableFooter>
              </Table>

            )}
          </CardContent>
        </Card>



      </div></div>
  )
}
