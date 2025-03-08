import PostPage from "@/components/organisms/PostPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <PostPage />
    </Suspense>
  );
}
