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
import { mockIncidentReports } from "./mockData";

export function IncidentReportsSecretary() {
    const [reports, setReports] = useState(mockIncidentReports);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleStatusChange = (reportId, newStatus) => {
        setReports(
            reports.map((report) =>
                report.id === reportId ? { ...report, status: newStatus } : report
            )
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "New":
                return "bg-blue-500";
            case "In Progress":
                return "bg-yellow-500";
            case "Resolved":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Incident Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>{report.category}</TableCell>
                                <TableCell>{report.location}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(report.status)}>
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setSelectedReport(report)}
                                            >
                                                View Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Incident Report Details</DialogTitle>
                                            </DialogHeader>
                                            {selectedReport && (
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Category:</span>
                                                        <span className="col-span-3">
                                                            {selectedReport.category}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">
                                                            Sub-category:
                                                        </span>
                                                        <span className="col-span-3">
                                                            {selectedReport.subCategory}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">
                                                            Date & Time:
                                                        </span>
                                                        <span className="col-span-3">
                                                            {selectedReport.date}{" "}
                                                            {selectedReport.time}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Location:</span>
                                                        <span className="col-span-3">
                                                            {selectedReport.location}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">
                                                            Description:
                                                        </span>
                                                        <span className="col-span-3">
                                                            {selectedReport.description}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Reporter:</span>
                                                        <span className="col-span-3">
                                                            {selectedReport.reporterName}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Contact:</span>
                                                        <span className="col-span-3">
                                                            {selectedReport.reporterContact}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Status:</span>
                                                        <Select
                                                            onValueChange={(value) =>
                                                                handleStatusChange(
                                                                    selectedReport.id,
                                                                    value
                                                                )
                                                            }
                                                            defaultValue={selectedReport.status}
                                                        >
                                                            <SelectTrigger className="col-span-3">
                                                                <SelectValue placeholder="Change status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="New">
                                                                    New
                                                                </SelectItem>
                                                                <SelectItem value="In Progress">
                                                                    In Progress
                                                                </SelectItem>
                                                                <SelectItem value="Resolved">
                                                                    Resolved
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
