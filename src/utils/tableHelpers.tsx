import { userData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
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
import { ArrowUpDown } from "lucide-react";
import { BiSolidBusiness } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { Switch } from "@/components/ui/switch";
import { handleUserUpdateOnAdmin } from "./handlers";
import { getAllUsersData } from "./helpers";
import { useRouter } from "next/navigation";

{
  /* TODO: delete token if download revoked */
}

export const columns: ColumnDef<userData>[] = [
  {
    accessorKey: "org",
    header: ({ column }) => {
      return (
        <>
          <div
            className="flex items-center justify-start"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div>Organization</div>
            <div>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </div>
        </>
      );
    },
    cell: function Cell({ row }) {
      const userData = row.original;
      return <div className="">{userData.org}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>Phone</div>
          <div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      return (
        <div className="flex justify-center">
          <div>{userData.phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "isGod",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-center">Role</div>
          <div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    cell: function Cell({ row }) {
      const userData = row.original;
      return userData.isGod ? (
        <div className="text-center">ADMIN</div>
      ) : (
        <div className="text-center">USER</div>
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
    cell: function Cell({ row }) {
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
          className="flex justify-center"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verification
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </div>
      );
    },
    cell: function Cell({ row }) {
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
    cell: function Cell({ row }) {
      const userData = row.original;
      const [isGod, setIsGod] = useState<boolean>(userData.isGod);
      const [canContribute, setCanContribute] = useState<boolean>(
        userData.canContribute,
      );
      const [canDownload, setCanDownload] = useState<boolean>(
        userData.canDownload,
      );
      const [isEmailVerified, setIsEmailVerified] = useState<boolean>(
        userData.isEmailVerified,
      );
      const [isOrgVerified, setIsOrgVerified] = useState<boolean>(
        userData.isOrgVerified,
      );
      const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(
        userData.isPhoneVerified,
      );
      const router = useRouter();
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
            <AlertDialogTrigger className="-my-4">
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
                <div className="flex flex-col space-y-4 pt-2">
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isGod</div>
                    <Switch
                      checked={isGod}
                      onCheckedChange={(value) => {
                        setIsGod(value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">canContribute</div>
                    <Switch
                      checked={canContribute}
                      onCheckedChange={(value) => {
                        setCanContribute(value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">canDownload</div>
                    {/* TODO: delete token if download revoked */}
                    <Switch
                      checked={canDownload}
                      onCheckedChange={(value) => {
                        setCanDownload(value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isEmailVerified</div>
                    <Switch
                      checked={isEmailVerified}
                      onCheckedChange={(value) => {
                        setIsEmailVerified(value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isOrgVerified</div>
                    <Switch
                      checked={isOrgVerified}
                      onCheckedChange={(value) => {
                        setIsOrgVerified(value);
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="text-zinc-50">isPhoneVerified</div>
                    <Switch
                      checked={isPhoneVerified}
                      onCheckedChange={(value) => {
                        setIsPhoneVerified(value);
                      }}
                    />
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsGod(userData.isGod);
                    setCanContribute(userData.canContribute);
                    setCanDownload(userData.canDownload);
                    setIsEmailVerified(userData.isEmailVerified);
                    setIsOrgVerified(userData.isOrgVerified);
                    setIsPhoneVerified(userData.isPhoneVerified);
                  }}
                >
                  CANCEL
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleUserUpdateOnAdmin(
                      isGod,
                      canContribute,
                      canDownload,
                      isEmailVerified,
                      isOrgVerified,
                      isPhoneVerified,
                      userData,
                    );
                    window.location.reload();
                  }}
                  className="cursor-pointer rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-center text-sm uppercase text-zinc-50 hover:opacity-90 xl:mt-0"
                >
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

export const allUsersData = async (): Promise<userData[]> => {
  const someData = [
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
  const data = await getAllUsersData();
  return data;
};
