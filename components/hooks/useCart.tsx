import { useCart } from '@/contexts/cart-context'

export default function CartButton() {
  const { totalItems } = useCart()
  
  return (
    <button className="cart-button">
      Carrito ({totalItems})
    </button>
  )
}