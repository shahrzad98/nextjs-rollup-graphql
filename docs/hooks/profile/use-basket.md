# useBasket

The useBasket hook is one of the more complex hooks. This hook contains all the steps of the shopping cart from adding
product to pay.

```jsx
const basket = useBasket();

const {
    factor,
    activeStep,
    handleNextStep,
    paymentLoading,
    paymentError,
    description,
    steps: { payment, shipping, addresses, items }
} = basket;

```

The hook syncs remote data, local storage, and application state. This gives you full access to the cart's features. You
do not have to get involved in the complexities of the shopping cart in this section. However, you should know digify
basket logic.

The Digify basket has four steps. each step has difference logic

---

### steps

1. Items
2. Addresses
3. Shipping
4. Payment

The first step is public but the other steps are private and require authentication. Each step is different in terms of
functionality, data, and functions.

### Step one:

```jsx
const { products, error, loading } = items;
```

Items contain products that have been added to the cart. Each product has information about itself as well as functions
for changing the count and deleting it.

```jsx
const [product] = products;

const {
    handleIncrementAmount,
    handleDecrementAmount,
    handleRemove,
    ...productsInformation
} = product;
```

### Step two:

Selecting the shipping address is the next step. This step allows you to delete or add addresses. UseAddress hooks are
used here.

There is also a section called "receiverInfo", which contains information about the receiver. The information is
typically retrieved from the user account, but can be changed using the "handleChangeUserInfo" function.

### Step three:

During this step, you can choose the shipping method and type of packaging.

### Step four:

The fourth step of the shopping cart is the final step. You can select a payment method, set a discount code, and use
loyalty credits in this section.

---

### handleNextStep

To change to the next step and pay order, use this function. In the last step, this function switches to a payment
function. This function does not require any changes.

---

### activeStep

It tells you what stage is currently active. One of the steps key is ActiveSteps.

#### Example:

```jsx
return (
    <button onClick={() => handleNextStep()}>Next step</button>
)
```

---

### handleAddToBasket

The functionality of this function is to add a new product to the cart or to add it to the count if it already product
exists. It is used in hooks that have products, but can also be used in other parts.

#### Example:

```jsx
return (
    <button onClick={() => handleAddToBasket({
        image: {
            image
        },
        amount,
        tax,
        bonus_value,
        has_loyalty,
        online_cost,
        online_primary_cost,
        product_label,
        variant_id,
        variant_name
    })}>
        Add to basket
    </button>
)
```

---

### factor

You can get all the calculated shopping cart prices from this field, as the field's name indicates.

```jsx
const {
    discount,
    loyalty,
    shippingCost,
    loyaltyGift,
    packingCost,
    tax,
    productsCount,
    totalCost,
    totalProductsCost
} = factor;
```

There is no need to recalculate prices for the cart since all prices are pre-calculated.

---

### description

Pre-payment details are stored in this section. Using the handler in hook, you can change the text inside the
description.

---

### paymentLoading and paymentError

In the last step, these two fields are used. These 2 fields show you the error and loading when you call the **
handleNextStep** function.
