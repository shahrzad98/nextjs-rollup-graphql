# useFavorites

This hook displays the products that have been added to the user's favorites list. Users can also edit and delete
products from this hook. Like the useBasket hook, this hook is used in some parts of has products to allow users to add
products to their favorites list. This hook also uses the useBasket hook to add products to the cart.

```js
const { products, error, loading, pagination } = useFavorites();
```

Use the functions inside the product list to remove and add products to your cart.

```jsx
return products.map((product) => (
    <div key={product.id}>
        <p>{item.cost.toLocaleString()}</p>
        <button onClick={product.handleAddToBasket}>Add to cart</button>
        <button onClick={product.handleRemoveFavorite}>Remove</button>
    </div>
))
```
