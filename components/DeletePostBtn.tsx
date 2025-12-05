import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface DeletePostBtnProps {
  onDelete: () => void;
}

export default function DeletePostBtn({ onDelete }: DeletePostBtnProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute right-3 top-3 p-2 text-card-foreground/90 
          hover:text-destructive hover:bg-destructive/10 rounded-full opacity-0 group-hover:opacity-100 hover-effect"
          title="Delete"
        >
          <Trash2 size={19} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Delete this post?
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            This action cannot be undone. Your post will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant={"outline"}>
              Close
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={onDelete}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

