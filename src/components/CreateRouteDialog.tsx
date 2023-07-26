import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { format } from "date-fns";
import { cn, useForm } from "lib/utils";
import { CalendarIcon } from "lucide-react";
import useDialogStore from "stores/DialogStore";
import { trpc } from "utils/trpc";
import { z } from "zod";
import { useToast } from "./ui/use-toast";

export function CreateRouteDialog() {
  const { toast } = useToast();

  const context = trpc.useContext();

  const createRoute = trpc.route.create.useMutation({
    onSuccess: async () => {
      await context.route.getAll.invalidate();
      toast({
        title: "Route Created",
        description: "The route has been created.",
      });
      setDialog(null);
      methods.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const methods = useForm({
    schema: z.object({
      path: z.string().regex(/^\/[a-z0-9-]+$/, 'Path must start with "/"'),
      location: z.string().url(),
      description: z.string(),
      expiration: z.coerce.date().optional(),
    }),
  });

  const { dialog, setDialog } = useDialogStore();

  return (
    <Dialog
      open={dialog === "createRoute"}
      onOpenChange={(open) => setDialog(open ? "createRoute" : null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Create a new route</DialogTitle>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) => {
                createRoute.mutate({
                  ...data,
                  expiration: data.expiration ?? null,
                });
              }, console.error)}
              className="space-y-8"
            >
              <FormField
                control={methods.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Path</FormLabel>
                    <FormControl>
                      <Input placeholder="/route" {...field} />
                    </FormControl>
                    <FormDescription>
                      The subroute on which the route will be available.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="https://google.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      The location to which the route will redirect.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="A navigation center" {...field} />
                    </FormControl>
                    <FormDescription>
                      A description of the route.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expiration date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When the link should automatically expire.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
