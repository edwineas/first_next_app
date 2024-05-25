// src/app/dashboard/components/MainContent.tsx
import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

import axios from "axios"

const MainContent = ({ organizations }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newOrg, setNewOrg] = React.useState({
    id: "",
    name: "",
    address: "",
    contact: "",
  });
  const { toast } = useToast();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/organizations/create", newOrg);
      toast({
        title: `${newOrg.name} added successfully`,
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  }
  return (
    <>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} float="right" m={4}>Add Organization</Button>
      )}
      
      {isOpen && (
      <Card>
        <CardHeader>
          <CardTitle>Add Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID</Label>
                <Input id="id" placeholder="ID" value={newOrg.id} onChange={(e) => setNewOrg({ ...newOrg, id: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" value={newOrg.name} onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Address" value={newOrg.address} onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" placeholder="Contact" value={newOrg.contact} onChange={(e) => setNewOrg({ ...newOrg, contact: e.target.value })} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
        </CardFooter>
      </Card>
      )}
      <Table>
        <TableCaption>List of Organizations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map(org => (
            <TableRow key={org.id}>
              <TableCell>{org.id}</TableCell>
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.address}</TableCell>
              <TableCell>{org.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  );
};

export default MainContent;