export type MessageType = "to pt-br" | "to en" | "synonyms" | "correct";

export function MessageTypeButton({
  title,
  value,
  currentValue,
  onChange,
}: {
  title: string;
  value: MessageType;
  currentValue: MessageType;
  onChange: (messageType: MessageType) => void;
}) {
  return (
    <button
      className={`button ${
        currentValue === value
          ? "bg-purple-600 text-white"
          : "bg-white text-purple-600 hover:bg-gray-300"
      }`}
      onClick={() => onChange(value)}
    >
      {title}
    </button>
  );
}
