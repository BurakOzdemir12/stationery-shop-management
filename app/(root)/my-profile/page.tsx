import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { getAllRequestsByUser } from "@/lib/queries/stockRequests";
import MyRequestList from "@/components/client/request/MyRequestList";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  const userId = session?.user?.id;
  const requests = await getAllRequestsByUser(userId || "");
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button className="btn-gold">Logout</Button>
      </form>
      <div className="">
        <h1 className=" scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-15 text-text-gold mb-5 ">
          My Requests
        </h1>

        <Suspense fallback={<ProfileSkeleton />}>
          <div className="">
            {requests.length === 0 ? (
              <h1 className="text-xl text-center mt-10  text-amber-50">
                No Requests{" "}
              </h1>
            ) : (
              <section
                aria-label="my-requests"
                id="my-requests"
                className=" grid grid-cols-2 lg:grid-cols-4 gap-7 justify-self-start "
              >
                {requests.map((r) => (
                  <MyRequestList request={r} key={r.id} />
                ))}
              </section>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};
export default Page;
