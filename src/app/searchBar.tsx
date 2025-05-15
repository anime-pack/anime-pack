import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    let navigate = useNavigate();

    useEffect(() => {}, [searchValue]);

    return (
        <div className="flex relative items-center justify-center max-w-[64%] min-w-[230px] w-[10%] focus-within:w-full focus-within:h-[65%] ease-in-out transition-all duration-800 right-4 has-[input:not(:placeholder-shown)]:w-full">
            <Input
                value={searchValue}
                placeholder="Ctrl + K"
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        e.preventDefault();
                        if (e.currentTarget.value !== '') {
                            navigate(
                                `/search?query=${e.currentTarget.value.replace(
                                    /[\s]/g,
                                    '-'
                                )}`
                            );
                        }
                    }
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                className="peer w-full ease-in-out transition-all duration-400 h-full placeholder:text-center placeholder:font-semibold placeholder:ease-in-out placeholder:duration-400 focus:placeholder:opacity-0"
            />
            <Search className="size-4 stroke-3 opacity-50 absolute left-2 ease-in-out transition-all duration-300 peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0" />
            <X
                onClick={() => setSearchValue('')}
                onMouseDown={(e) => e.preventDefault()}
                className="size-4 stroke-3 absolute right-0 ease-in-out transition-all duration-300 opacity-0 peer-[input:not(:placeholder-shown)]:opacity-100 peer-[input:not(:placeholder-shown)]:right-3 peer-focus:right-3 hover:shadow-accent hover:stroke-red-400"
            />
            {/* <ul className="absolute top-9.5 hidden bg-red-700 w-full ease-in-out duration-600 fade-out peer-[input:not(:placeholder-shown)]:peer-focus:flex">
                <li>TEST</li>   //TODO: fix the z index so it stays in top layer, may need to tweak carousel on home.tsx
            </ul> */}
        </div>
    );
}
