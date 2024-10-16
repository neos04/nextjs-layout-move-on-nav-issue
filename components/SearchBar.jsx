import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = ({ placholder, ...props }) => {
    return (
        <div className="min-w-[200px] max-w-[336px] w-full h-10 px-3 py-2 border rounded-md bg-background flex items-center gap-3">
            <Search />
            <input type="text" name='search' id='search'
                className='text-sm w-full h-full outline-none bg-transparent placeholder:text-muted-foreground'
                placeholder={placholder}
                {...props}
            />

        </div>
    )
}

export default SearchBar