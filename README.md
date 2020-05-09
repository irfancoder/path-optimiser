### Simple Path Optimiser

#### Demo

[Live Demo](https://irfancoder.github.io/path-optimiser/)

#### About

This is a simple project inspired by a problem faced while I was working as a bazaar food runner during Ramadhan, but is applicable to any delivery services under the sun.

This app uses an algorithm that optimises the path of delivery if you are delivering to multiple locations and recommends the best shortest path for you to take.

#### Bugs & Hackish Methods

- Yep, there are visual bugs, but the functionalities are still in tact. If I have the time, will fix them.
- If you take a closer look into the routing function inside `pages/index.js`, I have to space the API call with a timeout to make sure, the client receives & stores the response in an orderly manner. This is crucial for the algorithm to work, or else, the client will receive the response in a chaotic order.

#### Tech stack

- HERE Map, Geocoding, Routing API
- React
- styled-components

That's all. Thank you for dropping by!

Cheers,
Irfan<br/>
irfan@founders.my
