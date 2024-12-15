# useAddress

By using this hook, you can get a list of user addresses, create new addresses, delete them and edit them.

```jsx
const {
    addresses,
    fetchLoading,
    removeLoading,
    updateLoading,
    createLoading,
    removeError,
    updateError,
    createError,
    fetchError,
    handleCreateAddress,
    handleUpdateAddress,
} = useAddress();
```

The address list contains information about the address itself, as well as the ability to delete it.

```jsx
const { addresses } = useAddress();

return addresses.map((address, i) => (
    <div key={i}>
        <p>{address.name}</p>
        <p>{address.address}</p>
        <button onClick={address.handleRemoveAddress}>Remove address</button>
    </div>
));
```

The only difference between removing and updating is the first argument. For updating, the address ID is the first
argument.

```js
const address = {
    //Address content
}
handleCreateAddress(address, callback);
handleUpdateAddress(addressId, address, callback);
```
