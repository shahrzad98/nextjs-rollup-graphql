# useOrders

You can get a list of users' orders with this hook.

```jsx
const { statusCount, ordersList, loading, error } = useOrders();
```

Orders have a status attached to them. Each status has its own meaning. Depending on the status of the order, it has
different functions. For example, if the order has a UNPAID status, the pay function has been added to the order.

### statusCount:

StatusCount field allows you to filter orders list and get each order's status count.

```jsx
const { error, loading, handleChangeTab, statuses } = statusCount;
```

Use the handleChangeTab function to change order status. This function gets the status name and filters the orders based
on it.

```jsx
const { handleChangeTab, statuses } = statusCount;

return Object.entries(statuses).map(([key, value], i) => {
    return (
        <div key={i}>
            <button onClick={() => handleChangeTab(key)}>{key}({value})</button>
        </div>
    )
})
```


