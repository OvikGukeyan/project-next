import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (key: string) => void;
    setSelectedIngredients: (key: string) => void;
    setSizes: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));


    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []));


    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));


    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({ ...prev, [name]: value }));
      }

    return useMemo(() => ({
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setSelectedIngredients: toggleIngredients,
        setSizes: toggleSizes,
        setPizzaTypes: togglePizzaTypes,
        setPrices: updatePrice,
    }), [
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
       
    ]);

    };