# useNotificationSettings

This hook can be used to change the notification settings.

```js
const {
    settings: { email, sms, notification },
    updateLoading,
    handleSaveSettings
} = useNotificationSettings();
```

The announcement settings are divided into three sections. Each section contains a value and a handler function.

In the end, you can save it by using the **handleSaveSettings** function.

