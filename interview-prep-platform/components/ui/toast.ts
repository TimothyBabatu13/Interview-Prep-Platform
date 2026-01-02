import { toast } from "sonner";

export const ErrorToast = (msg: string) => toast.error(msg, {
    style: {
        background: 'red'
    }
})


export const SuccessToast = (msg: string) => toast.success(msg)