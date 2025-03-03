'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Store, Admin, User, Franchise } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { addStoreAdminSchema } from "@/lib/utils";

type AdminWithUser = Admin & { user: User }
type StoreWithAdmins = Store & { admins: AdminWithUser[] }
export default function ManageAdminsPage() {

  const { toast } = useToast();
  const { data: session } = useSession();
  const [adminEmail, setAdminEmail] = useState<string>()

  const addStoreAdminMutation = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData();
        const parseRes = addStoreAdminSchema?.safeParse({ email: adminEmail, storeId: getStoreAdminsQuery?.data?.store?.id.toString() })
        if (parseRes?.success) {
          formData.append('email', parseRes?.data?.email)
          formData.append('storeId', parseRes?.data?.storeId)
          const req = await fetch("/api/add-store-admin", { method: "POST", body: formData })
          const data = await req.json() as { status: string }
          if (data.status == "admin sucessfully created") {
            toast({ title: "Success", description: "Admin sucessfully created" })

          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "error creating admin",
            });
          }
        }
      }
      catch (e) {
        console.error(e)

        toast({
          variant: "destructive",
          title: "Error",
          description: "an error occured in the submission chain",
        });
      }
    }, mutationKey: ["addStoreAdmin"]
  })
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Admin </DialogTitle>
                <DialogDescription>
                  Admin will manage {getStoreAdminsQuery?.data?.store?.franchise?.name} {getStoreAdminsQuery?.data?.store?.location}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Admin email
                  </Label>
                  <Input id="name" onChange={(e) => { setAdminEmail(e.target.value) }} value={adminEmail} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={addStoreAdminMutation?.isLoading} type="submit" onClick={() => { addStoreAdminMutation?.mutate() }}>{addStoreAdminMutation.isLoading ? "Creating" : "Create"}</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

                        <TableCell>{admin?.user?.email}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
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

