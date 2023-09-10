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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

{
  /* TODO: delete token if download revoked */
}

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
      const [isDialogOpened, setIsDialogOpened] = useState();
      return (
        <div className="flex justify-end">
          {/* <Dialog open={isDialogOpened}>
            <DialogTrigger className="-my-4">
              <GiSettingsKnobs size={28} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-3xl">User Controls</DialogTitle>
                <DialogDescription className="text-zinc-300">
                  Toggle permissons and verifications!
                </DialogDescription>
              </DialogHeader>

              <div className="flex w-full justify-between">
                <div className="text-zinc-50">isGod</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">canContribute</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">canDownload</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">isEmailVerified</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">isOrgVerified</div>
                <Switch />
              </div>
              <div className="flex w-full justify-between">
                <div className="text-zinc-50">isPhoneVerified</div>
                <Switch />
              </div>
              <ThemeButton
                title="Update Changes"
                onClick={() => {
                  setIsDialogOpened(undefined);
                }}
              />
            </DialogContent>
          </Dialog> */}
          <AlertDialog>
            <AlertDialogTrigger>
              <GiSettingsKnobs size={28} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-3xl text-zinc-50">
                  User Controls
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-300">
                  Toggle permissons and verifications!
                </AlertDialogDescription>
                <div className="flex flex-col space-y-4">
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isGod</div>
                    <Switch />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">canContribute</div>
                    <Switch />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">canDownload</div>
                    {/* TODO: delete token if download revoked */}
                    <Switch />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isEmailVerified</div>
                    <Switch />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isOrgVerified</div>
                    <Switch />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isPhoneVerified</div>
                    <Switch />
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="">
                  {/* <ThemeButton title="cancel" /> */}
                  CANCEL
                </AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-center text-sm uppercase text-zinc-50 hover:opacity-90 xl:mt-0">
                  {/* <ThemeButton title="update" /> */}
                  update
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
    id: 1,
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
    email: "matteblack@gmail.com",
    fireUid: "9HsGkRjBlAfxeYWcUvDsXjZaPQpA",
    id: 2,
    isContributor: true,
    isEmailVerified: true,
    isGod: false,
    isOrgVerified: true,
    isPhoneVerified: false,
    isTac: false,
    name: "Matte Black",
    org: "Facebook Inc",
    phone: "9876543210",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fmatte_black.png?alt=media&token=1234567890",
    token: "AbCdEfGhIjKlMnOp",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "example1@gmail.com",
    fireUid: "abcdefg123456789",
    id: 3,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: true,
    isPhoneVerified: false,
    isTac: true,
    name: "John Doe",
    org: "Microsoft Corp",
    phone: "5555555555",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fjohn_doe.png?alt=media&token=abcdefghijklmnopqrstuvwxyz",
    token: "ZzYyXxWwVvUu",
  },
  {
    canContribute: false,
    canDownload: false,
    email: "example2@gmail.com",
    fireUid: "hijklmnopqrstuvwxyz",
    id: 4,
    isContributor: true,
    isEmailVerified: true,
    isGod: false,
    isOrgVerified: false,
    isPhoneVerified: true,
    isTac: false,
    name: "Alice Johnson",
    org: "Amazon Web Services",
    phone: "1231231231",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Falice_johnson.png?alt=media&token=0123456789",
    token: "AaBbCcDdEeFfGg",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "example3@gmail.com",
    fireUid: "mnopqrstuvwxy1234",
    id: 5,
    isContributor: true,
    isEmailVerified: false,
    isGod: false,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: true,
    name: "Bob Smith",
    org: "Apple Inc",
    phone: "9998887777",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fbob_smith.png?alt=media&token=9876543210",
    token: "MmNnOoPpQqRrSs",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "example4@gmail.com",
    fireUid: "1234567890abcdef",
    id: 6,
    isContributor: true,
    isEmailVerified: true,
    isGod: false,
    isOrgVerified: true,
    isPhoneVerified: true,
    isTac: false,
    name: "Eve Brown",
    org: "Tesla Inc",
    phone: "7777777777",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Feve_brown.png?alt=media&token=abcdefghijklmnopqrstuvwxyz",
    token: "TtUuVvWwXxYyZz",
  },
  {
    canContribute: false,
    canDownload: false,
    email: "example5@gmail.com",
    fireUid: "uvwxyz1234567890",
    id: 7,
    isContributor: false,
    isEmailVerified: true,
    isGod: true,
    isOrgVerified: false,
    isPhoneVerified: true,
    isTac: false,
    name: "Grace White",
    org: "Netflix Inc",
    phone: "4444444444",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fgrace_white.png?alt=media&token=0123456789",
    token: "GgHhIiJjKkLlMm",
  },
  {
    canContribute: true,
    canDownload: true,
    email: "example6@gmail.com",
    fireUid: "0987654321zyxwvu",
    id: 8,
    isContributor: true,
    isEmailVerified: true,
    isGod: false,
    isOrgVerified: true,
    isPhoneVerified: false,
    isTac: true,
    name: "David Johnson",
    org: "Twitter Inc",
    phone: "6666666666",
    proUrl:
      "https://firebasestorage.googleapis.com/v0/b/health-ab371.appspot.com/o/pros%2Fdavid_johnson.png?alt=media&token=abcdefghijklmnopqrstuvwxyz",
    token: "DdEeFfGgHhIiJj",
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
