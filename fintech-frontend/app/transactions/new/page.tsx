"use client";

import { useForm } from
  "react-hook-form";

import { useMutation } from
  "@tanstack/react-query";

import { useRouter } from
  "next/navigation";

import toast from
  "react-hot-toast";

import Card from
  "@/components/ui/Card";

import Button from
  "@/components/ui/Button";

import {
  createTransaction,
} from "@/services/transactionService";

export default function NewTransactionPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm();

  const mutation = useMutation({
    mutationFn:
      createTransaction,

    onSuccess: () => {
      toast.success(
        "Transaction created"
      );

      router.push(
        "/transactions"
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to create transaction"
      );
    },
  });

  const onSubmit = (
    data: any
  ) => {
    mutation.mutate({
      ...data,

      amount:
        Number(data.amount),

      type:
        Number(data.type),
    });
  };

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">
        New Transaction
      </h1>

      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label>
              Idempotency Key
            </label>

            <input
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "idempotencyKey"
              )}
            />
          </div>

          <div>
            <label>
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
                "amount"
              )}
            />
          </div>

          <div>
            <label>
              Loan Id
            </label>

            <input
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "loanId"
              )}
            />
          </div>

          <div>
            <label>
              Description
            </label>

            <textarea
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register(
                "description"
              )}
            />
          </div>

          <div>
            <label>
              Type
            </label>

            <select
              className="
                border
                p-2
                rounded
                w-full
              "
              {...register("type")}
            >
              <option value="0">
                Payment
              </option>

              <option value="1">
                Disbursement
              </option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={
              mutation.isPending
            }
            className="
              bg-black
              text-white
            "
          >
            {
              mutation.isPending
                ? "Creating..."
                : "Create Transaction"
            }
          </Button>
        </form>
      </Card>
    </main>
  );
}