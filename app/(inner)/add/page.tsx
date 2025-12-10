import PostCreateForm from "@/components/PostCreateForm";
import { ChevronLeft } from "lucide-react";

const CreatePostPage = () => {
  return (
    <div className="p-4 sm:p-8 space-y-10">
      <button
        className="text-foreground hover:text-social-indigo flex gap-3 items-center hover-effect"
        aria-label="Go back"
      >
        <ChevronLeft />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Back
        </h1>
      </button>

      <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-sm p-6 sm:p-10 border border-border/70">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-social-green mb-8 border-b border-border pb-5">
          📝 Create New Post
        </h2>

        <PostCreateForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
