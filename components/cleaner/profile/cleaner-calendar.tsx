type CleanerCalendarProps = {
  id: string;
};

export default async function CleanerCalendar({ id }: CleanerCalendarProps) {
  await new Promise((res) => setTimeout(res, 2000));

  return <div className="mt-10">CleanerCalendar</div>;
}
