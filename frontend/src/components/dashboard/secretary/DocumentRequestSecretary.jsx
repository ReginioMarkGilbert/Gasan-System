"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mockDocumentRequests } from "./mockData";

export function DocumentRequestSecretary() {
    const [requests, setRequests] = useState(mockDocumentRequests);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleStatusChange = (requestId, newStatus) => {
        setRequests(
            requests.map((request) =>
                request.id === requestId ? { ...request, status: newStatus } : request
            )
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500";
            case "Approved":
                return "bg-green-500";
            case "Completed":
                return "bg-blue-500";
            case "Rejected":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Document Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Resident</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.requestDate}</TableCell>
                                <TableCell>{request.type}</TableCell>
                                <TableCell>{request.residentName}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(request.status)}>
                                        {request.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setSelectedRequest(request)}
                                            >
                                                View Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Document Request Details</DialogTitle>
                                            </DialogHeader>
                                            {selectedRequest && (
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Type:</span>
                                                        <span className="col-span-3">
                                                            {selectedRequest.type}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">
                                                            Request Date:
                                                        </span>
                                                        <span className="col-span-3">
                                                            {selectedRequest.requestDate}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Resident:</span>
                                                        <span className="col-span-3">
                                                            {selectedRequest.residentName}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Purpose:</span>
                                                        <span className="col-span-3">
                                                            {selectedRequest.purpose}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Status:</span>
                                                        <Select
                                                            onValueChange={(value) =>
                                                                handleStatusChange(
                                                                    selectedRequest.id,
                                                                    value
                                                                )
                                                            }
                                                            defaultValue={selectedRequest.status}
                                                        >
                                                            <SelectTrigger className="col-span-3">
                                                                <SelectValue placeholder="Change status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Pending">
                                                                    Pending
                                                                </SelectItem>
                                                                <SelectItem value="Approved">
                                                                    Approved
                                                                </SelectItem>
                                                                <SelectItem value="Completed">
                                                                    Completed
                                                                </SelectItem>
                                                                <SelectItem value="Rejected">
                                                                    Rejected
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
