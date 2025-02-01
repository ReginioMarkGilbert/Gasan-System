import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, MoreHorizontal, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

export function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [actionLoading, setActionLoading] = useState({
        verifying: false,
        rejecting: false,
        userId: null,
    });

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users/barangay", {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });

            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser?.role === "secretary" || currentUser?.role === "chairman") {
            fetchUsers();
        }
    }, [currentUser]);

    const handleVerifyUser = async (userId) => {
        try {
            setActionLoading({ verifying: true, rejecting: false, userId });
            const res = await axios.patch(
                `http://localhost:5000/api/users/${userId}/verify`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success("User verified successfully");
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to verify user");
        } finally {
            setActionLoading({ verifying: false, rejecting: false, userId: null });
        }
    };

    const handleRejectUser = async (userId) => {
        try {
            setActionLoading({ verifying: false, rejecting: true, userId });
            const res = await axios.patch(
                `http://localhost:5000/api/users/${userId}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success("User rejected successfully");
                fetchUsers();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reject user");
        } finally {
            setActionLoading({ verifying: false, rejecting: false, userId: null });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">Total Users: {users.length}</p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Barangay</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>{user.barangay}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={user.isVerified ? "default" : "secondary"}
                                        className={
                                            user.isVerified
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : ""
                                        }
                                    >
                                        {user.isVerified ? "Verified" : "Pending"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleVerifyUser(user._id)}
                                                disabled={
                                                    actionLoading.verifying ||
                                                    actionLoading.rejecting ||
                                                    user.isVerified
                                                }
                                                className={
                                                    user.isVerified
                                                        ? "bg-green-50 text-green-800 cursor-not-allowed"
                                                        : "text-green-600 focus:text-green-600 cursor-pointer"
                                                }
                                            >
                                                {actionLoading.verifying &&
                                                actionLoading.userId === user._id ? (
                                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-green-600" />
                                                ) : (
                                                    <CheckCircle2
                                                        className={`mr-2 h-4 w-4 ${
                                                            user.isVerified
                                                                ? "text-green-800"
                                                                : "text-green-600"
                                                        }`}
                                                    />
                                                )}
                                                {actionLoading.verifying &&
                                                actionLoading.userId === user._id
                                                    ? "Verifying..."
                                                    : user.isVerified
                                                      ? "Already Verified"
                                                      : "Verify User"}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleRejectUser(user._id)}
                                                disabled={
                                                    actionLoading.verifying ||
                                                    actionLoading.rejecting ||
                                                    user.isVerified
                                                }
                                                className={
                                                    user.isVerified
                                                        ? "bg-red-50 text-red-800 cursor-not-allowed"
                                                        : "text-red-600 focus:text-red-600 cursor-pointer"
                                                }
                                            >
                                                {actionLoading.rejecting &&
                                                actionLoading.userId === user._id ? (
                                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-red-600" />
                                                ) : (
                                                    <XCircle
                                                        className={`mr-2 h-4 w-4 ${
                                                            user.isVerified
                                                                ? "text-red-800"
                                                                : "text-red-600"
                                                        }`}
                                                    />
                                                )}
                                                {actionLoading.rejecting &&
                                                actionLoading.userId === user._id
                                                    ? "Rejecting..."
                                                    : user.isVerified
                                                      ? "Cannot Reject"
                                                      : "Reject User"}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
