import { CartItemSet } from '../redux/slises/cartSlice.ts'

export const calcTotalPrice = (items: CartItemSet[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}