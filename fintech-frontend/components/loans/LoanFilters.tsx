type Props = {
  userId: string;
  setUserId: (value: string) => void;
};

export default function LoanFilters({
  userId,
  setUserId,
}: Props) {
  return (
    <div className="mb-6">
      <input
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value)
        }
        placeholder="Filter by userId"
        className="
          border
          p-2
          rounded
        "
      />
    </div>
  );
}