'use client'
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Store, Franchise, Redeemables } from "@prisma/client";
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
import { isAdminAtomInst } from "@/lib/utils";
import { useAtom } from "jotai";

export default function ManageRewards() {
  const [isAdminAtom] = useAtom(isAdminAtomInst)
  const [redeemableTitle, setRedeemableTitle] = useState<string>()
  const [redeemablePointPerUnit, setredeemablePointPerUnit] = useState<string>()
  const queryClient = new QueryClient()
  const { toast } = useToast();

  //const getAdminStores = useQuery({
  //  queryFn: async () => {
  //    if (session?.user?.email) {
  //
  //      const formData = new FormData()
  //      formData.append("email", session?.user?.email)
  //      const req = await fetch("/api/get-admin-stores", { method: "POST", body: formData })
  //      const data = await req.json() as { id: number }
  //      return data
  //    } else {
  //    }
  //  }, queryKey: ["adminStores"]
  //})
  const addRedeemableMutation = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData()
        if (redeemablePointPerUnit && redeemableTitle && isAdminAtom) {

          formData.append("redeemableTitle", redeemableTitle)
          formData.append("redeemablePointPerUnit", redeemablePointPerUnit)
          formData.append("storeId", isAdminAtom?.adminManagedStoreId?.toString())
          const req = await fetch("/api/add-store-redeemables", { method: "POST", body: formData })
          const data = await req.json() as { status: string }
          if (data.status === "success") {
            setRedeemableTitle(undefined)
            setredeemablePointPerUnit(undefined)
            toast({
              variant: "default",
              title: "Success",
              description: "Store redeemables created",
            });
            queryClient.invalidateQueries(["storeRedeemables"])

          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Error Creating store Redeemables",
            });
          }
        } else {

          toast({
            variant: "destructive",
            title: "Error",
            description: "Some Submission details are missing",
          });
        }
      } catch (e) {
        console.error(e)

        toast({
          variant: "destructive",
          title: "Error",
          description: "Error Adding store Redeemables",
        });
      }
    }, mutationKey: ["addRedeemable"]
  })
  const getStoreRedeemablesQuery = useQuery({
    queryFn: async () => {
      try {
        if (isAdminAtom) {

          const formData = new FormData()
          formData.append("storeId", isAdminAtom?.adminManagedStoreId?.toString())
          const req = await fetch('/api/get-store-redeemables', { method: 'POST', body: formData })
          const data = await req.json() as { storeWithRedeemables: Store & { Redeemables: Redeemables[], franchise: Franchise } }
          return data
        }
      } catch (e) {
        console.error(e)

        toast({
          variant: "destructive",
          title: "Error",
          description: "Error Fetching store Redeemables",
        });
      }

    }, queryKey: ["storeRedeemables"]
  })
  return (
    <div className="p-6 w-1/2">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Redeemables</h1>
            <p className="text-muted-foreground">Manage {getStoreRedeemablesQuery?.data?.storeWithRedeemables?.franchise?.name} {getStoreRedeemablesQuery?.data?.storeWithRedeemables?.location} Redeemables </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Redeemabble
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Add Admin </DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <div className="form-control flex flex-col">
                <div className="flex items-center m-3">
                  <Label htmlFor="name" className="">
                    Redeemable title
                  </Label>
                  <Input id="name" onChange={(e) => { setRedeemableTitle(e.target.value) }} value={redeemableTitle} />
                </div>
                <div className="flex items-center m-3">
                  <Label htmlFor="name" className="">
                    Redeemable Points Cost Per Redeemable Unit
                  </Label>
                  <Input id="name" onChange={(e) => { setredeemablePointPerUnit(e.target.value) }} value={redeemablePointPerUnit} />
                </div>

              </div>
              <DialogFooter>
                <Button disabled={addRedeemableMutation?.isLoading} type="submit" onClick={() => { addRedeemableMutation?.mutate() }}>{addRedeemableMutation.isLoading ? "Creating" : "Create"}</Button>
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
            <CardTitle>Store Redeemables</CardTitle>
            <CardDescription>A list of {getStoreRedeemablesQuery?.data?.storeWithRedeemables?.franchise?.name} {getStoreRedeemablesQuery?.data?.storeWithRedeemables?.location} Redeemables </CardDescription>
          </CardHeader>
          <CardContent>
            {getStoreRedeemablesQuery?.isLoading ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getStoreRedeemablesQuery?.data?.storeWithRedeemables?.Redeemables?.map((item) => {
                    return (
                      <TableRow key={item?.id}>
                        <TableCell>{item?.name}</TableCell>

                        <TableCell>{item?.point}</TableCell>
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
