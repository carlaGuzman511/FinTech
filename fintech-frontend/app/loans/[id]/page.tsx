interface LoanDetailsPageProps {
  params: {
    id: string;
  };
}

export default function LoanDetailsPage({
  params,
}: LoanDetailsPageProps) {
  return (
    <div>
      <h1>Loan Details</h1>
      <p>Loan ID: {params.id}</p>
    </div>
  );
}