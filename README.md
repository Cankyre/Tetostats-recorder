# Tetostats-recorder

A program that periodically saves TETR.IO stats

## How to use?

1. Download and install [Node.JS](https://nodejs.org)
2. Clone or download this repository
3. Open a terminal or cmd in the source directory and type `npm start` so that the program starts working

## How to config?
1. Open the ``config.json`` file from the program's root directory.
2. Change the options, following the guide below
3. Enjoy ;)

### Modify the config file
**WARNING: DO NOT REMOVE ANY PROPERTY AS IT WILL CRASH THE PROGRAM**

|Property|Meaning|
|:-:|:-:|
|outputDir|The path to the directory your data will go in |
|data.leaderboards|The request list the program will make (check section below)|
|data.savedStats|The stats the program will save (check [Tetra channel API docs](https://tetr.io/about/api/))|
|data.interval|The interval, in seconds, at which the program will make its request (one request per second max)|
|data.removeLocalDuplicates|Will remove duplicates in a same time period|
|data.removeGlobalDuplicates|Will not add the time period if it is exactly the same as the last one|

#### Request list
Each element from the request list will be formatted as follow:
``leaderboard#country&option1&option2``
ex. ``tl#fr&l50`` means tetra league leaderboard for france with a limit of 50

* leaderboards can be "tl" (tetra league), "tlf" (tetra league full export) or "xp" (xp)
* options can be (except for "tlf"): "&l" (limit), "&a" (after) and "&b" (before). Check [Tetra channel API docs](https://tetr.io/about/api/) for more infos