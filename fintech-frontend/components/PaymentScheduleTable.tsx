export default function PaymentScheduleTable({
  schedule,
}: any) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>#</th>
          <th>Due Date</th>
          <th>Total</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Balance</th>
        </tr>
      </thead>

      <tbody>
        {schedule.map((item: any) => (
          <tr key={item.paymentNumber}>
            <td>{item.paymentNumber}</td>

            <td>
              {new Date(
                item.dueDate
              ).toLocaleDateString()}
            </td>

            <td>{item.totalPayment}</td>

            <td>{item.principal}</td>

            <td>{item.interest}</td>

            <td>{item.remainingBalance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}