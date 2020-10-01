# reactChat
experiment to test out react with socket.io and regular http connections.

### Remaining Finishing Touches
1. Move socket listeners to Chat.js - done
2. change state to a kinda ordered obj of rooms - done?
3. Create Rooms
4. Search for Rooms
5. search for users
6. Add user to room / join room
7. change casing of css to kebob-case - pass
8. change room components to minimized circles/images for mobile view
9. change addMessage from text area to input?
   1.  I want a growing input area but also send message on 'enter'
10. Only load 20 messages/rooms at a time and when you reach the top/bottom get more messages
11. someone is typing notification

### Farshoot
11. green light for people online, red for offline - pass as we don't have friends capability
12. Online vs Offline - pass
13. indexDB? - not useful/slow
14. friends list?  - prob not - requires significant db change
15. push notification when you're not on app - really want to learn
16. keep track of unread messages of each room- would require a join table
    1.  still want to do it though

## Refactor Data Structure

   The function I want is that a person has push notifications for all messages in all rooms that he is in.
When a room receives a new message, rooms component on the left should update to the top row
The room should update with the number of messages that has not been read - this will require a new join table
Rooms should also display the latest message
Another thing of consideration is blind people/screen readers (for when figuring out order)

   Currently, the data we're getting is an array of rooms, then onload of a room page, we get the room's messages. which does not support the functionality that I want.
We can easily get an array of rooms with the latest 1 message and build the rooms component that way.
But how do we on the node side and react side deal with new messages and only updating the room that received a new message?
We can continuously receive a new array of rooms with their last message, but that might lead to a lot of data being sent?
It would be the easiest way.  To achieve this, we would need to keep track of users that are logged in.
Then, when a room receives a message, we can check who of the participants of the room is logged in and send them a new array of rooms with the correct order.  What do we do when that user is on that room's page?

Can we on the node side, convert the array of rooms into an object?  Will order be preserved?
If that's the case, then when a new message is sent, we can just broadcast it to everyone who has an active socket and is part of the room
That means keeping track of all users that are logged in.  Will this lead to performance issues?
I think keeping track of all logged in users will lead to an increase in memory, but for the size of my app, it should be ok

## Plan of attack
1. State consists of an object of rooms and order integer
   1. React logs in, gets token, makes socket connection
   2. socket keeps track of all the users in an object/hashmap
   3. socket queries for rooms array (with last message), converts it to roomsObject and emits it,
      1. need to decided if I want to emit last room's messages at this point, but I think I will just load on click of a room
   4. react receives roomsObject and roomMessages and builds rooms component
   5. react sending messages - updates own message state, emits newMessage event to socket with message, users, roomId
   6. socket receives message and cycles through users in that room and checks if that user is logged in.  If logged in then we emit the message to that user.
   7. react - when a user receives that newMessage event, it updates the state.  To make the room appear at top of list of rooms, flexbox order property is used?

2. State Consists of an array of rooms, currentRoomMessages


state = {
   rooms : {
      someRoom: {
         id: 1,
         messages : []
      },
      someRoom2: {
         id : 2,
         messages: []
      }
   }
   currentRoom : someRoom,
   order: 0,
}

things to test, when a room receives a new message, does the new roomsObject get reorganized?

Thing to focus on now.
RoomId vs RoomName
currently, the url points to roomId, but how do I pass the correct room to the Room component?
Objects do have order, but integers are ordered first and in ascending order so that will not work.
we can append a string to the front to turn it into a string?

make socketCreator function for the login and App.js component