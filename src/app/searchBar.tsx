import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {}, [searchValue]);
    
    return (
        <div id="search-bar" className="flex relative items-center justify-center max-w-[64%] min-w-[107px] w-[10%] focus-within:w-full focus-within:h-[65%] ease-in-out transition-all duration-500 right-4 has-[input:not(:placeholder-shown)]:w-full">
            <Input
                value={searchValue}
                placeholder="Ctrl + K"
                onChange={(e) => setSearchValue(e.target.value)}
                className="peer w-full ease-in-out transition-all duration-400 h-full placeholder:pl-5 placeholder:font-semibold placeholder:ease-in-out placeholder:duration-400 focus:placeholder:opacity-0" />
            <Search className="size-4 stroke-3 absolute left-2 ease-in-out transition-all duration-300 peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0" />
            <X
                onClick={() => setSearchValue('')}
                onMouseDown={(e) => e.preventDefault()}
                className="size-4 stroke-3 absolute right-0 ease-in-out transition-all duration-300 opacity-0 peer-[input:not(:placeholder-shown)]:opacity-100 peer-focus:right-3 hover:shadow-accent hover:stroke-red-400" />
        </div>
    )
}