import { useParams } from "react-router"

export default function HomeAnime() {
    const params = useParams()

    return (
        <div>
            <h1>NICE</h1>
            <p>{ `${JSON.stringify(params)}` }</p>
        </div>
    )
}