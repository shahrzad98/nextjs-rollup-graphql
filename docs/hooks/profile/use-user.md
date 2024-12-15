# useUser

Using this hook, you can get user information, update profiles and change passwords. You can also check the
authentication of user.

```jsx
const {
    info,
    handleSubmit,
    handleChange,
    updateLoading,
    fetchLoading,
    fetchUserInfo,
    isLoggedIn,
    error,
} = useUser();
```

### info:

You can get all user information in the info field. To update information, you can use the handleChange function, and
then with handleSubmit you can save it.

```jsx
const { first_name } = info;

return (
    <div>
        <label htmlFor='first_name'></label>
        <input
            id='first_name'
            type='text'
            onChange={(ev) => handleChange('first_name', ev.target.value)}
        />
        <button disabled={updateLoading} onClick={handleSubmit}>
            {updateLoading ? 'Loading...' : 'Save'}
        </button>
    </div>
)
```
