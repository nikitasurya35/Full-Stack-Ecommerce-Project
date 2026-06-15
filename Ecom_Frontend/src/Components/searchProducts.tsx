import React from 'react'
import { useNavigate } from 'react-router-dom';
import type { suggestion } from "../Data/suggestion";

interface SearchProductsProps {
    keyword: string;
}

const SearchProducts = ({ keyword }: SearchProductsProps) => {

    const navigate = useNavigate();
    const [suggestions, setSuggestions] = React.useState<suggestion[]>([]);

    return (
        <div>searchProducts</div>
    )
}

export default SearchProducts