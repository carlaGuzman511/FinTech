import clsx from "clsx";

type Props =
  React.ButtonHTMLAttributes<
    HTMLButtonElement
  >;

export default function Button({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        `
        px-4
        py-2
        rounded-lg
        font-medium
        transition
        disabled:opacity-50
        `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}