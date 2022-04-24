# Chiarapassaro.dev
Technologies:
* Vue 3 Composition API & Vue Router 
* Typescript
* Animejs - animate svg
* Cytoscape - create node graph from obj
* Color Palettes Range - generate colors palette
* Marked - parse md to html
* Hljs - highlight code 
* Axios - ajax calls
* Luxon - date format

## Design and palettes
First of all, I wanted to create a website design because I hadn't done it for a long time.
If you don't know, I had been working as a web designer for ten years then gradually I approached front-end development and back-end development.

By the way, let's focus on this work.
I started with the design, I used to do this job with Adobe Illustrator - recently I have also played with Figma - but in this case, I used the first.
I exported the waves and the icons in SVG. 
All colors then are injected in the SVG with CSS custom properties to perform periodically the stop's positions change.

Furthermore, depending on the hour, the script selects a couple of colors, stored in an array, and generates a new gradient palette. To achieve this goal, I have used my package Color Palettes Range, which generates, among other things, an array of colors from one color to another.

The animation is very slow, I didn't want an 80's effect rather a hypnotic one ;D

## Design Dark Mode
The Dark Mode is trendy, and so I have decided to add it to my site, obviously, the palette's colors change accordingly with a simple transition.

## Graph Node - Cytoscape
I wanted to represent my interests and skills in a visual mode, and finally, I thought that a graph node was the right way.
The main topics are:
* Teaching
* Articles
* Projects
From these three nodes starts a web of connections between different subjects, clicking on these, related contents are shown.

I have to show the list of articles from the Medium feed and show my project's `readme.md` also.
To achieve this latest goal, I have decided to insert the Markdown files in a folder and open them directly with an Axios calling, and after parse the content in HTML and highlight the code, with `Marked` and `Hljs`.

## Programming
I wanted to play also with Composition API  - this is a Vue project - and Typescript.
It is the first time I have used Typescript, and it could not be necessary for this little project, but it was a good playground.

## What else?
I hope you could enjoy it!
This is the address:

And if you want, send me a message with your opinion :D
<br/>
[https://chiarapassaro.dev/](https://chiarapassaro.dev/)

