"use client";

import { useState } from "react";

import { useForm }
  from "react-hook-form";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast
  from "react-hot-toast";

import Card
  from "@/components/ui/Card";

import Button
  from "@/components/ui/Button";

import PaymentScheduleTable
  from "@/components/loans/PaymentScheduleTable";

import {
  simulateLoan,
  createLoan,
} from "@/services/loanService";

export default function LoanSimulator() {
  const [result, setResult] =
    useState<any>(null);

  const queryClient =
    useQueryClient();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const simulationMutation =
    useMutation({
      mutationFn: simulateLoan,

      onSuccess: (data) => {
        setResult(data);

        toast.success(
          "Simulation completed"
        );
      },

      onError: () => {
        toast.error(
          "Simulation failed"
        );
      },
    });

  const createLoanMutation =
    useMutation({
      mutationFn: createLoan,

      onSuccess: () => {
        toast.success(
          "Loan created"
        );

        queryClient.invalidateQueries({
          queryKey: ["loans"],
        });
      },

      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Loan Creation failed";

        toast.error(message);
      },
    });

  const onSubmit = (data: any) => {
    simulationMutation.mutate({
      amount:
        Number(data.amount),

      termMonths:
        Number(data.termMonths),

      annualInterestRate:
        0.24,

      loanType:
        Number(data.loanType),

      monthlyIncome:
        Number(data.monthlyIncome),
    });
  };

  const handleCreateLoan = () => {
    const values = getValues();

    createLoanMutation.mutate({
      userId: String(values.userId),

      amount:
        Number(values.amount),

      termMonths:
        Number(values.termMonths),

      annualInterestRate:
        0.24,

      loanType:
        Number(values.loanType),

      monthlyIncome:
        Number(values.monthlyIncome),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">
              User Id
            </label>

            <input
              type="string"
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "userId",
                {
                  required: true,
                }
              )}
            />

          </div>

          <div>
            <label className="block mb-1">
              Amount
            </label>

            <input
              type="number"
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "amount",
                {
                  required: true,
                  min: 500,
                  max: 50000,
                }
              )}
            />

            {errors.amount && (
              <p className="text-red-500">
                Invalid amount
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Term Months
            </label>

            <input
              type="number"
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "termMonths",
                {
                  required: true,
                  min: 6,
                  max: 60,
                }
              )}
            />

            {errors.termMonths && (
              <p className="text-red-500">
                Invalid term
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Monthly Income
            </label>

            <input
              type="number"
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "monthlyIncome",
                {
                  required: true,
                }
              )}
            />
          </div>

          <div>
            <label className="block mb-1">
              Loan Type
            </label>

            <select
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "loanType"
              )}
            >
              <option value="0">
                Fixed
              </option>

              <option value="1">
                Decreasing
              </option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={
              simulationMutation.isPending
            }
            className="
              bg-black
              text-white
            "
          >
            {simulationMutation.isPending
              ? "Calculating..."
              : "Simulate Loan"}
          </Button>
        </form>
      </Card>

      {result && (
        <>
          <Card>
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
              "
            >
              <div>
                <p className="text-gray-500">
                  Monthly Payment
                </p>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  $
                  {
                    result.monthlyPayment
                  }
                </h2>
              </div>

              <div>
                <p className="text-gray-500">
                  Annual Rate
                </p>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {
                    result.annualEffectiveRate
                  }
                </h2>
              </div>

              <div>
                <p className="text-gray-500">
                  Monthly Rate
                </p>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {
                    result.monthlyEffectiveRate
                  }
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={
                  handleCreateLoan
                }
                className="
                  bg-green-600
                  text-white
                "
              >
                Request Loan
              </Button>
            </div>
          </Card>

          <Card>
            <h2
              className="
                text-xl
                font-bold
                mb-4
              "
            >
              Payment Schedule
            </h2>

            <PaymentScheduleTable
              schedule={
                result.schedule
              }
            />
          </Card>
        </>
      )}
    </div>
  );
}