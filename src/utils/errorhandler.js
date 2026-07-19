import toast from "react-hot-toast";

export function ErrorHandler(error){

    return(
    
        toast.error (error.response?.data?.message || "Something went Wrong !")
    )
}