import { Payment, userData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidBusiness } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GiSettingsKnobs } from "react-icons/gi";
import { toast } from "react-toastify";
import ThemeButton from "@/components/themeButton";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
export const columns: ColumnDef<userData>[] = [
  {
    accessorKey: "org",
    header: ({ column }) => {
      return (
        <div
          className="flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organization
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          className="flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "isGod",
    header: ({ column }) => {
      return (
        <div
          className="flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      return userData.isGod ? (
        <div className="">ADMIN</div>
      ) : (
        <div className="">USER</div>
      );
    },
  },
  {
    accessorKey: "canContribute",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="whitespace-nowrap">Contribution</div>
          <div className="shrink-0">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      return userData.canContribute ? (
        <div className="text-center">ALLOWED</div>
      ) : (
        <div className="text-center">DENIED</div>
      );
    },
  },
  {
    accessorKey: "canDownload",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="whitespace-nowrap">API Access</div>
          <div className="shrink-0">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      return userData.canDownload ? (
        <div className="text-center">ALLOWED</div>
      ) : (
        <div className="text-center">DENIED</div>
      );
    },
  },
  {
    accessorKey: "b",
    header: ({ column }) => {
      return (
        <div
          className="flex"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verification
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </div>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      return (
        <div className="flex justify-center space-x-1">
          <div>
            {userData.isPhoneVerified ? (
              <AiFillPhone size={20} color={"#1ED760"} />
            ) : (
              <AiFillPhone size={20} color={"orange"} />
            )}
          </div>
          <div>
            {userData.isEmailVerified ? (
              <MdEmail size={20} color={"#1ED760"} />
            ) : (
              <MdEmail size={20} color={"orange"} />
            )}
          </div>
          {!!userData.org && (
            <div>
              {userData.isOrgVerified ? (
                <BiSolidBusiness size={20} color={"#1ED760"} />
              ) : (
                <BiSolidBusiness size={20} color={"orange"} />
              )}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "a",
    header: () => <div className="text-right">Controls</div>,
    cell: ({ row }) => {
      const userData = row.original;

      return (
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="-my-4">
              <GiSettingsKnobs size={28} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-3xl">User Controls</DialogTitle>
                {/* <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription> */}
              </DialogHeader>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">isGod</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">isContributor</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">canDownload</div>
                <Switch />
              </div>
              <ThemeButton title="Update Changes" />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export const payments: userData[] = [
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: false,
    isPhoneVerified: true,
    isTac: true,
    name: "aatte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "nateblcak9089@gmail.com",
    fireUid: "7PLFoTuFXNbbGPNnGwwFZLicHr53",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Matte Black",
    org: "Google INC",
    phone: "1212121212",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fea95c82b-d8f9-45f2-aada-d2b3af578f4e%2Frolando.png?alt=media&token=dc818c20-03e5-497d-86be-11ac64ee75a6",
    token: "DrpRrvLS1XQppVqMxOmc9vey01xIjVW2mcdYFkL95O1iTLBwpF",
  },
  // ...
];
