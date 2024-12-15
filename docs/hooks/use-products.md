# useProducts

The hook displays the list of products. It automatically reads and writes queries.

_This hook has a ssrQueries that you can use to SSR pages._

You can filter products using different parameters.

```js
const { filterParams } = useProducts();
const { search, others, ordering, categories, cost, specifications } = filterParams;
```

The names of the fields inside the **filterParams** indicate the type of filter, but the order in which they operate
varies.

### search:

It is return a string through which you can search for the desired product name.

```jsx
const { search: { handleChange, value } } = filterParams;

return (
    <input
        type='text'
        onChange={(ev) => handleChange(ev.target.value)}
        value={value} />
)
```

### ordering:

You can sort products with this

```jsx
const { ordering: { options } } = filterParams;

return options.map((option, i) => (
    <div>
        <label htmlFor={`id_${i}`}>{option.key}</label>
        <input
            id={`id_${i}`}
            type='radio'
            value={option.value}
            checked={option.isSelected}
            onChange={() => option.handleChange()} />
    </div>
))
```

### categories:

This field allows you to filter by product category.

```jsx
const { categories: { options, handleSubmit } } = filterParams;

return (
    <div>
        {
            options.map((option, i) => (
                <div>
                    <label htmlFor={`id_${i}`}>{option.key}</label>
                    <input
                        id={`id_${i}`}
                        type='checkbox'
                        value={option.value}
                        checked={option.isSelected}
                        onChange={() => option.handleChange()} />
                </div>
            ))
        }
        <button onChange={handleSubmit}>Submit</button>
    </div>
)
```

### cost:

You can filter the minimum and maximum price of products.

```jsx
const { cost: { handleChange, handleSubmit, value, initialValue } } = filterParams;

return (
    <div>
        <Slider
            min={initialValue[0]}
            max={initialValue[1]}
            value={value}
            onChange={(value) => handleChange(value)}
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
)
```

### specifications:

You can filter products with colors, sizes, etc.

```jsx
return filterParams.specifications.map((specification, i) => {
    return (
        <div key={i}>
            <p>{specification.name}</p>
            <div>
                {specification.options.map((option, j) => (
                    <div key={j}>
                        <label>{option.key}</label>
                        {option.colorCode && (
                            <span style={{ backgroundColor: option.colorCode }} />
                        )}
                        <input
                            onChange={() => option.handleChange()}
                            checked={option.isSelected}
                            type="checkbox" value={option.value}
                        />
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => specification.handleSubmit()}>Submit</button>
            </div>
        </div>
    );
})
```

### others:

Other filters can be found here.

```jsx
const { others: { in_stock, has_discount } } = filterParams;
return (
    <div>
        <div>
            <label htmlFor='in_stock'>In stock</label>
            <input
                id='in_stock'
                type='checkbox'
                checked={in_stock.value}
                onChange={in_stock.handleChange}
            />
        </div>
        <div>
            <label htmlFor='has_discount'>Has discount</label>
            <input
                id='has_discount'
                type='checkbox'
                checked={has_discount.value}
                onChange={has_discount.handleChange}
            />
        </div>
    </div>
)
```

