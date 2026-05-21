export default function EmptyState({
  title,
}: {
  title: string;
}) {
  return (
    <div
      className="
        p-8
        text-center
        text-gray-500
      "
    >
      {title}
    </div>
  );
}