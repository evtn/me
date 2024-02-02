# evtn.me source code

This is the source code of [evtn.me](https://evtn.me), my website, and at the same time, a more interactive version of my CV (as compared to [PDF version](https://evtn.me/cv)).

It's written in TypeScript with Preact, using Octicons by GitHub and Vite.

The justification for this stack choice is kinda weak, but I think it's okay as long as website bundle size is less than PDF version size (it is now).

To make it more interesting, I've put a few easter eggs there, some are pretty obvious, some are not.

## Code quality

This code was written in a short period of time, with little to no design guidelines and undergone many changes in development process. There are probably some minor problems such as redundant code, non-obvious approaches, project structure inconsistencies and just general problems.

If you want to point out some problem with code, create an issue. Any non-constructive issue would be closed without discussion — if you don't have time for constructive points, then I don't have time to hear whatever you will write instead.

If you want to suggest a feature, create an issue. Keep in mind that it's ultimately up to me to decide if this feature should be on _my_ website.

## Usage

You are free to fork the source as long as you follow the license terms.

To develop locally, clone the repository, run `install` with your favourite package manager, then:

-   to serve a dev build, run `dev` script
-   to make a production build, run `build` script

## To Do

### Theme selector

At the moment, theme is derived from system theme. [This may work poorly in Chromium-based browsers](https://bugs.chromium.org/p/chromium/issues/detail?id=998903), so a nice selector / override could be implemented.

### Finer settings system

I've added localstorage-backed settings system, but for now it's just generating a few switches. A more complex system could allow storing, e.g., theme data for theme selector
