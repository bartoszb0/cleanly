import { BookingHistoryCard } from "@/components/customer/bookings/booking-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BOOKING_STATUS } from "@/lib/constants/booking";
import { getBookingsForCustomer } from "@/lib/data/bookings";
import { getCurrentCustomer } from "@/lib/data/customer";
import { ExtendedBooking } from "@/types";

export default async function History() {
  const user = await getCurrentCustomer();

  const jobs = await getBookingsForCustomer(user.id);

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mt-10 text-center">My Bookings</h1>
      </div>
      <Tabs
        defaultValue="pending"
        className="w-full mt-10 p-4 max-w-4xl mx-auto"
      >
        <TabsList
          className="grid w-full grid-cols-4 bg-slate-900/50 h-10"
          variant="line"
        >
          {BOOKING_STATUS.map((status) => (
            <TabsTrigger value={status} key={status} className="capitalize">
              {status}
            </TabsTrigger>
          ))}
        </TabsList>

        {BOOKING_STATUS.map((status) => {
          // Filter jobs for this specific tab once
          const filteredJobs = jobs.data.filter((job) => job.status === status);

          return (
            <TabsContent key={status} value={status} className="space-y-4 mt-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job: ExtendedBooking) => (
                  <BookingHistoryCard key={job.id} job={job} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-slate-500 text-sm">
                    No {status} bookings found.
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
