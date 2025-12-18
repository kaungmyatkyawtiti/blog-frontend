"use client"

import z from "zod";
import { postSchema } from "@/lib/schemas";
import { useMutationCreatePost } from "@/hooks/postHook";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { useRouter } from "next/navigation";

type PostFormSchema = z.infer<typeof postSchema>;

export default function PostCreateForm() {
  const showLatest = useBoundStore(state => state.showLatest);
  const { showNoti } = useBoundStore();
  const { mutateAsync: createPost } = useMutationCreatePost(showLatest);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: ""
    }
  })

  const onSubmit: SubmitHandler<PostFormSchema> = async (data) => {
    console.log("submit")
    try {
      const result = await createPost(data);
      console.log("Create post success from post create from", result);
      router.push("/");
      showNoti("Successfully created post.");
    } catch (err) {
      console.log("Create post error from post create form", err);
      showNoti("Failed to create post.");
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="content"
          className="block font-medium text-foreground mb-4 text-lg"
        >
          Content
        </label>
        <textarea
          id="content"
          placeholder="Share your thoughts..."
          rows={8}
          className={cn(
            "post-input hover-effect",
            errors.content && "error"
          )}
          {...register("content")}
        />
        {
          errors.content &&
          <p className="font-medium text-destructive ps-2 text-sm">{errors.content.message}</p>
        }
      </div>

      <button
        type="submit"
        className="fancy-button bg-social-green hover:bg-social-green/90 text-white hover-effect"
      >
        Create Post
      </button>
    </form>
  )
}

