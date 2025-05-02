import { useSearchParams } from "react-router"

export default function HomeSearch() {
    const [searchParams] = useSearchParams()

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4">
            <h1>SearchPage</h1>
            <p>{ searchParams.get("query") }</p>
        </div>
    )
}