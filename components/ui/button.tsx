import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      default: "bg-black text-white hover:bg-gray-800",
      outline: "border border-gray-300 hover:bg-gray-100 text-black",
      ghost: "hover:bg-gray-100 text-black",
    }

    const sizes = {
      default: "h-10 py-2 px-4 text-sm",
      sm: "h-9 px-3 text-xs",
      lg: "h-12 px-8 text-base",
    }

    const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`

    return <Comp className={styles} ref={asChild ? undefined : ref} {...props} />
  },
)

Button.displayName = "Button"

export { Button }

