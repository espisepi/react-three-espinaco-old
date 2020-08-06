import { selector } from 'recoil';

export const fetchProducts = selector({
    key: 'productsSelector',
    get: async ({get}) => {
        try {
            const response = await fetch('http://46.101.166.115/wp-json/wp/v2/product');
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
});