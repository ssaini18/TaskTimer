# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Technical decisions

1. There were two options to show rooms and their related task, one was to show a section type list with title as room id and tasks as children other was to create separate page for rooms list and task list
2. Created separate page as with this approach we only have to get list of tasks if user clicks on room and navigate to tasks list page 
3. Less api calls as we dont have to load all the tasks we only load task as users need which is only one api calls
4. Pull to refresh is also single api call 
5. We show user only the tasks that he want to see instead of showing a long list of tasks that user is not interested in
6. Also works good with deep linking as we can open a certain room if we want with this approach
7. Created reusable components, helper functions for better reusability

## App Demo

1. Login

![Image](https://github.com/user-attachments/assets/2c71797f-6e4a-444f-ab87-bc9de660b4d5)

2. Create room, open room and get new task, push notification with action buttons and pull to refresh

![Image](https://github.com/user-attachments/assets/2f703493-e2ad-4cae-a277-b0a82e6560d9)