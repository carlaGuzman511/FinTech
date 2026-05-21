type Props = {
  schedule: any[];
};

export default function
PaymentScheduleTable({
  schedule,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table
        className="
          w-full
          border
          border-collapse
        "
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">
              #
            </th>

            <th className="p-2 border">
              Due Date
            </th>

            <th className="p-2 border">
              Total
            </th>

            <th className="p-2 border">
              Principal
            </th>

            <th className="p-2 border">
              Interest
            </th>

            <th className="p-2 border">
              Balance
            </th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((item) => (
            <tr
              key={
                item.paymentNumber
              }
            >
              <td className="p-2 border">
                {
                  item.paymentNumber
                }
              </td>

              <td className="p-2 border">
                {new Date(
                  item.dueDate
                ).toLocaleDateString()}
              </td>

              <td className="p-2 border">
                $
                {
                  item.totalPayment
                }
              </td>

              <td className="p-2 border">
                $
                {item.principal}
              </td>

              <td className="p-2 border">
                $
                {item.interest}
              </td>

              <td className="p-2 border">
                $
                {
                  item.remainingBalance
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}