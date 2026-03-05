import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types";
import ChatBookingMessage from "./chat-booking-message";

interface ChatMessageItemProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showHeader: boolean;
  isPending: boolean;
  hasError: boolean;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  showHeader,
  isPending,
  hasError,
}: ChatMessageItemProps) => {
  return (
    <div
      className={`flex mt-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={cn(
          "max-w-[75%] w-fit flex flex-col gap-1 transition-all duration-500 ease-in-out",
          {
            "items-end": isOwnMessage,
          },
          isPending && "opacity-50",
          hasError && "opacity-20",
        )}
      >
        {showHeader && (
          <div
            className={cn("flex items-center gap-2 text-xs px-3", {
              "justify-end flex-row-reverse": isOwnMessage,
            })}
          >
            <span className={"font-medium"}>{message.user.name}</span>
            <span className="text-foreground/50 text-xs">
              {new Date(message.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        )}
        {message.booking_id !== null ? (
          <ChatBookingMessage
            bookingId={message.booking_id}
            isOwnMessage={isOwnMessage}
          />
        ) : (
          <div
            className={cn(
              "py-2 px-3 rounded-xl text-sm w-fit",
              isOwnMessage
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground",
            )}
          >
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
};
