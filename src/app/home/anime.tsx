import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

export default function HomeAnime() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    let [anidata, setAnidata] = useState(null)

    useEffect(() => {
        const getAnidata = async () => {
            setAnidata(await invoke("jikan_api_fullid", { id: searchParams.get('id') }))
        };

        getAnidata();
    })

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4 overflow-hidden">
            <h1>NICE</h1>
            <p>{`${JSON.stringify(params)}`}</p>
            <p>{searchParams.get('id')}</p>
            <hr />
            <h1>Anime data</h1>
            <p>{ JSON.stringify(anidata) }</p>
        </div>
    );
}
