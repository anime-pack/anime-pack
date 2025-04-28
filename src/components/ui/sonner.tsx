import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      {...props}
    />
  )
}

export { Toaster }
