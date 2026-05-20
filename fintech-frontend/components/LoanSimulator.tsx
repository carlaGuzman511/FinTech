"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { simulateLoan } from "@/services/loanService";
import PaymentScheduleTable from "./PaymentScheduleTable";

export default function LoanSimulator() {
  const [result, setResult] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await simulateLoan({
        ...data,
        amount: Number(data.amount),
        termMonths: Number(data.termMonths),
        annualInterestRate: 0.24,
        loanType: 0,
      });

      setResult(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full"
            {...register("amount", {
              required: true,
              min: 500,
              max: 50000,
            })}
          />

          {errors.amount && (
            <p className="text-red-500">
              Invalid amount
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Term Months"
            className="border p-2 w-full"
            {...register("termMonths", {
              required: true,
              min: 6,
              max: 60,
            })}
          />

          {errors.termMonths && (
            <p className="text-red-500">
              Invalid term
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-bold">
            Monthly Payment:
            ${result.monthlyPayment}
          </h2>

          <PaymentScheduleTable
            schedule={result.schedule}
          />
        </div>
      )}
    </div>
  );
}