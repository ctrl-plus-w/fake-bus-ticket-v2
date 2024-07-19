import ResizeableProvider from "@/context/ResizeableContext";
import TicketPage from "@/module/TicketPage";
import { useLocalSearchParams } from "expo-router";

const parseDate = (date: any) => {
  if (!date || typeof date !== "string") return;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return;

  return parsedDate;
};

const Page = () => {
  const { date } = useLocalSearchParams();

  const parsedDate = parseDate(date);
  if (!parsedDate) return;

  return (
    <ResizeableProvider>
      <TicketPage date={parsedDate} />
    </ResizeableProvider>
  );
};

export default Page;
