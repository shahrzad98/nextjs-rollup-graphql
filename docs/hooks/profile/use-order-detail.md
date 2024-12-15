# useOrderDetail

You can get all the order information by using the useOrderDetail hook.

```js
const { invoice, items, status, loading, error } = useOrderDetail();
```

One of the most complex kit hooks is this, Because all the functionality of an order is written in this hook.

**useOrderDetail** contains several hooks, each with its own functionality. In the hook, each field is updated
separately and has its own functions and information.

### status:

```js
const {
    status: {
        stepDescription,
        expireStepTime,
        progressStep,
        paymentMethod,
        statusName
    }
} = useOrderDetail();
```

Currently, the status field is the most important and most difficult hook fields.

Orders have different statuses and steps. In addition, an order can vary depending on the payment method.

Orders are staged based on their status ID and previous status ID, the registration date of each step can also influence
the order steps.

It is also important to note that each order can have different functions, which also change depending on the order
status.

The kit simplifies all the complexity of orders and eliminates all existing exceptions. But learning the behind logic of
orders is very important.


---

### stepDescription:

Each order status has a unique description. This field allows you to find out what each order description is.

### expireStepTime:

This field shows the expiration date, We will discuss this field in more depth below.

### paymentMethod:

In this field, you can find the order payment method. There are currently 2 payment methods. Card to card and payment
method.

### statusName:

In the paragraph above, we explained that orders can change depending on the type of payment. One of those changes is
the number of steps.

Currently, there are only two payment methods available. We will explain each one in more detail in this hook.

**card-to-card**

Is a new and simple way to pay. Using this method, the recipient can sell their products without having a payment
gateway. There are several additional steps before confirming payment with this method, so it is more complicated.

This method involves six steps. The first step is for the merchant to confirm the order registered by the customer
before payment, after which the customer may upload a photo of the payment invoice. Invoices sent by customer must then
be verified for accuracy. Once approved, the order becomes a regular order, like an order paid through the payment
gateway.

Some of these steps have an expiration date. If the merchant or the customer does not complete the steps within the
specified deadline time, the order will expire with a certain situation.

### In progress Steps:

The status of steps in progress is when the order is open and the steps are progressing as planned.

| Status name                     | Description                                                                                                                                                                                                                                                          | Note                                                                                                                                                               |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1. WAITING_FOR_APPROVAL         | Orders that have not been paid must first be registered. During this stage, the customer registers the order with the card-to-card method and waits for the merchant to approve the payment. At this stage, money is paid and only the customer registers the order. | During this stage, if the merchant does not confirm the order for payment within the specified time, the order status will change to OVERTIME_REQUEST_BY_MERCHANT. |
| 2. WAITING_FOR_PAYMENT          | Now merchant confirmed the order. Now the customer enters the card number in the status field and makes a payment and then uploads a photo of the invoice.                                                                                                           | During this stage, if the customer does not send invoice photo within the specified time, the order status will change to OVERTIME_PAYMENT_BY_CUSTOMER.            |
| 3. WAITING_FOR_PAYMENT_APPROVAL | The customer must wait until the uploaded photo is verified as correct by merchant.                                                                                                                                                                                  | During this stage, if the merchant does confirm the invoice photo within the specified time, the order status will change to OVERTIME_ORDER_BY_MERCHANT.           |
| 4. IN_PREPARING                 | In this case, it means that the order has been paid and approved, and it is no longer different from an order that has been paid via the gateway method.                                                                                                             | This status has no expiration time.                                                                                                                                |
| 5. SENT                         | This status indicates that the product was sent by the merchant. This status does not have an expiration date and is automatically updated by the merchant.                                                                                                          | -                                                                                                                                                                  |
| 6. RECEIVED                     | The product has been delivered. This status can change if the product has been delivered or not.                                                                                                                                                                     | You have a status change function in this section. When the user has not received the product, it becomes.                                                         |                                                                                                                                                                   |

### Overtime Steps:

These statuses appear when the customer or merchant does not complete the steps within the specified time.

| Status name                           | Description                                                                                                                                                                                            | Note                                                                                                                                                                                                      |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1. OVERTIME_REQUEST_BY_MERCHANT       | This means that the merchant has not been able to confirm the request (Order before payment) at the specified time.                                                                                    | -                                                                                                                                                                                                         |
| 2. OVERTIME_PAYMENT_BY_CUSTOMER       | When the merchant confirms the order for payment and the customer does not send the invoice photo by the specified time (has not paid the order), the order expires at this step.                      | -                                                                                                                                                                                                         |                                                                                                                                                                    |      |
| 3. OVERTIME_ORDER_BY_MERCHANT         | The customer paid for the order, but the merchant did not confirm the invoice sent at the specified time. In this case the merchant who owes the customer money must return the money to the customer. | When the money is returned to the customer, the order becomes OVERTIME_ORDER_BY_MERCHANT_SETTLED. Another very important point is that the order only changes to this status after the customer has paid. |
| 3. OVERTIME_ORDER_BY_MERCHANT_SETTLED | The order reaches this status after the merchant returns the amount to the customer.                                                                                                                   | -                                                                                                                                                                                                         |

### Canceled Steps:

Merchants can cancel orders with a reason before the order is approved and reaches the **IN_PREPARING** status and based
on its status, it is placed in different steps of the order process.

| Status name                           | Description                                                                                                                                |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| 1. CANCELED_REQUEST_BY_MERCHANT       | Request (Order before payment) with this status have been canceled before the customer pays by the merchant.                               |
| 3. CANCELED_ORDER_BY_MERCHANT         | It means that the order has been canceled after the customer has paid, so the merchant owes the customer and must return the order amount. |
| 3. CANCELED_ORDER_BY_MERCHANT_SETTLED | Once the customer's payment has been returned, the order will reach this status.                                                           |

---

**Gateway**

Payment is made through a bank payment gateway. There are only two steps compared to the card-to-card method.

### In progress Steps:

The status of steps in progress is when the order is open and the steps are progressing as planned.

| Status name     | Description                                                                                                                                                                          | Note                                                                                                               |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| 1. PAID         | The order has been successfully paid through the gateway. A merchant must confirm the order within a certain time frame after completing this step because it has an expiration date | If an order is not confirmed within the specified time frame, its status will change to OVERTIME_ORDER_BY_MERCHANT |
| 2. IN_PREPARING | In this case, it means that the order has been paid and approved.                                                                                                                    | This status has no expiration time.                                                                                |
| 3. SENT         | This status indicates that the product was sent by the merchant. This status does not have an expiration date and is automatically updated by the merchant.                          | -                                                                                                                  |
| 4. RECEIVED     | The product has been delivered. This status can change if the product has been delivered or not.                                                                                     | You have a status change function in this section. When the user has not received the product, it becomes.         |                                                                                                                                                                   |

### Overtime Steps:

These statuses appear when the merchant does not complete the steps within the specified time.

| Status name                           | Description                                                                                                                                                                              | Note                                                                                              |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| 1. OVERTIME_ORDER_BY_MERCHANT         | The customer paid for the order, but the merchant did not confirm it in the specified time. In this case the merchant who owes the customer money must return the money to the customer. | When the money is returned to the customer, the order becomes OVERTIME_ORDER_BY_MERCHANT_SETTLED. |
| 1. OVERTIME_ORDER_BY_MERCHANT_SETTLED | The order reaches this status after the merchant returns the amount to the customer.                                                                                                     | -                                                                                                 |

### Canceled Steps:

Merchants can cancel orders with a reason before the order is approved and reaches the **IN_PREPARING**

| Status name                           | Description                                                                                                                                |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| 1. CANCELED_ORDER_BY_MERCHANT         | It means that the order has been canceled after the customer has paid, so the merchant owes the customer and must return the order amount. |
| 1. CANCELED_ORDER_BY_MERCHANT_SETTLED | Once the customer's payment has been returned, the order will reach this status.                                                           |

### Other steps:

| Status name   | Description                                                                                                                                                                                                                  |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1. UNPAID     | The customer cancels the payment through the payment gateway. Although the order has not been paid, it becomes an order. The customer can pay again at the appointed time to become PAID, otherwise, the order will EXPIRED. |
| 1. EXPIRED    | It means that the customer has not paid for the order on time.                                                                                                                                                               |
| 5. UNRECEIVED | The customer has not received the product in this status. Until the product is received, the status remains the same.                                                                                                        |

---

### invoice:

```js
const {
    invoice: {
        address,
        cost,
        createdAt,
        description,
        orderStatus,
        paymentMethod,
        packingMethod,
        receivedAt,
        receiverName,
        receiverPhoneNumber,
        referenceCode,
        shippingMethod,
        shippingTime,
        trackingCode
    }
} = useOrderDetail();
```

With this field you can get the order invoice in full. Depending on the order status, the data inside the invoice
changes.

---

### items:

```jsx
const {
    items: {
        items,
        totalProductsCost,
        tax,
        discount,
        shippingCost,
        packingCost,
        productsCount,
        totalCost
    }
} = useOrderDetail();

return items.map(item => {
    return (
        <div key={item.id}>
            <img src={item.image} alt='' />
            <p>{item.label}</p>
            <Link {...item.link}>
                <a>Show product</a>
            </Link>
        </div>
    )
})
```
