import { useSession } from "@clerk/nextjs";
import { RoutesTable } from "components/RoutesTable";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { useRouter } from "next/navigation";
import useDialogStore from "stores/DialogStore";
import { trpc } from "utils/trpc";

export default function Page() {
  const routes = trpc.route.getAll.useQuery();

  const { setDialog } = useDialogStore();

  const { isLoaded, session } = useSession();

  if (!routes.isSuccess || !isLoaded) return <div>Loading...</div>;

  const permissions = session?.user.publicMetadata.permissions;

  if (!Array.isArray(permissions) || !permissions.includes("go")) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="container space-y-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Routes</h1>
          <Button variant="outline" onClick={() => setDialog("createRoute")}>
            Add
          </Button>
        </div>
        <Separator />
        <div className="relative">
          <RoutesTable data={routes.data} />
        </div>
      </div>
    </div>
  );
}
