import { useForm, FormProvider, useWatch } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import CustomSearchBarField from "./CustomSearchBarField"
import { useAppDispatch } from "../app/hooks"
import { searchProducts } from "../app/Redux/products/productSlice"

export const searchValueSchema = z.object({
  search: z.string().min(1, { message: "Product is required" }),
})

interface ISearchFormValue {
  search: string
}

export default function SearchBarForm() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [showResult, setShowResult] = useState<boolean>(false)

  const handleShowResult = () => {
    setShowResult(true)
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  const form = useForm<ISearchFormValue>({
    defaultValues: { search: "" },
    resolver: zodResolver(searchValueSchema),
    mode: "all",
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitted },
  } = form

  const searchValue = useWatch({ control, name: "search" })

  const searchTerm = useWatch({ control, name: "search" })

  const onSubmit = (data: ISearchFormValue) => {
    console.log(data)
    dispatch(searchProducts(searchValue))
    navigate(`search?q=${encodeURIComponent(searchTerm.trim())}`)
    handleHideResult()
    reset()
  }

  useEffect(() => {
    if (isSubmitted) {
      handleShowResult()
    }
  }, [isSubmitted])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: 450 }}>
        <CustomSearchBarField
          showResult={showResult}
          onShowResult={handleShowResult}
          onHideResult={handleHideResult}
          placeholder="Search Products Here..."
          id={"search-product"}
          name={"search"}
        >
          <SearchIcon />
        </CustomSearchBarField>
      </form>
    </FormProvider>
  )
}
