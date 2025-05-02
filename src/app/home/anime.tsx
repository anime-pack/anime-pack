import { useParams, useSearchParams } from "react-router"
import SearchBar from "../searchHistoryExample.test.tsx"

export default function HomeAnime() {
    const params = useParams()
    const [searchParams] = useSearchParams()

    console.log(params.name?.at(12))

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4">
            <h1>NICE</h1>
            <p>{`${JSON.stringify(params)}`}</p>
            <p>{ searchParams.get("id") }</p>
            <hr />
            <p>searchBar with searchHistory example:</p>
            <SearchBar onSearch={() => {return}} />
        </div>
    )
}