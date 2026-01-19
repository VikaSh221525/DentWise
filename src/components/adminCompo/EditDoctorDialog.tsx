import { useUpdateDoctor } from "@/hooks/use-doctors";
import { formatPhoneNumber } from "@/lib/utils";
import { Doctor, Gender } from "@prisma/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

interface EditDoctorDialogProps {
    isOpen: boolean;
    onClose: () => void;  //doesn't return anything
    doctor: Doctor | null;
}

function EditDoctorDialog({ isOpen, onClose, doctor }: EditDoctorDialogProps) {
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor)
    // console.log(editDoctor);

    const updateDoctorMutation = useUpdateDoctor();

    const handlePhoneChange = (value: string) => {
        const formattedPhone = formatPhoneNumber(value)
        if (editingDoctor) {
            setEditingDoctor({ ...editingDoctor, phone: formattedPhone })
        }
    }

    const handleSave = () => {
        if (editingDoctor) {
            updateDoctorMutation.mutate({ ...editingDoctor }, { onSuccess: handleClose })
        }
    }
    const handleClose = () => {
        onClose();
        setEditingDoctor(null)

    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[500px] '>
                <DialogHeader>
                    <DialogTitle>Edit Doctor</DialogTitle>
                    <DialogDescription>Edit a doctor's information.</DialogDescription>
                </DialogHeader>

                {editingDoctor && (
                    <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='new-name'>Name *</Label>
                            <Input
                                id='new-name'
                                value={editingDoctor?.name || ""}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                                placeholder='Dr. John Smith' />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='new-speciality'>Speciality *</Label>
                            <Input
                                id='new-speciality'
                                value={editingDoctor?.speciality || ""}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, speciality: e.target.value })}
                                placeholder='Dentist' />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='new-email'>Email *</Label>
                        <Input
                            id='new-email'
                            value={editingDoctor?.email || ""}
                            onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                            placeholder='johnsmith@gmail.com' />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='new-phone'>Phone *</Label>
                        <Input
                            id='new-phone'
                            value={editingDoctor?.phone || ""}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder='(555) 456-7890' />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='new-gender'>Gender</Label>
                            <Select
                                value={editingDoctor?.gender || ""}
                                onValueChange={(value) => setEditingDoctor({ ...editingDoctor, gender: value as Gender })} >
                                <SelectTrigger>
                                    <SelectValue placeholder="select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='new-status'>Status</Label>
                            <Select
                                value={editingDoctor?.isActive ? "active" : "inactive"}
                                onValueChange={(value) => setEditingDoctor({ ...editingDoctor, isActive: value === "active" })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                )}
                <DialogFooter>
                    <Button variant={"outline"} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!editingDoctor || updateDoctorMutation.isPending} >
                        {updateDoctorMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default EditDoctorDialog