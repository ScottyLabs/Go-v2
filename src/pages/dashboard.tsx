import { RoutesTable } from "components/RoutesTable";
import { Button } from "components/ui/button";
import useDialogStore from "stores/DialogStore";
import { trpc } from "utils/trpc";

export default function Page() {
  const routes = trpc.route.getAll.useQuery();

  const { setDialog } = useDialogStore();

  if (!routes.isSuccess) return <div>Loading...</div>;

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Routes</h1>
        <Button variant="outline" onClick={() => setDialog("createRoute")}>
          Add
        </Button>
      </div>
      <hr />
      <RoutesTable data={routes.data} />
    </div>
  );
}
