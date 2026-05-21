const colors: any = {
  Approved:
    "bg-green-100 text-green-700",

  Pending:
    "bg-yellow-100 text-yellow-700",

  Rejected:
    "bg-red-100 text-red-700",

  Active:
    "bg-blue-100 text-blue-700",
};

export default function Badge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
}