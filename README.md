# MSCI651
## International Project Management
The goal of the project was to identify ressources related to chemistry grade X learning elements within the Pakistany educational systems.
The team used a google sheet to list all ressources identified in form of URLs. There were multiple Google sheets, one for each chapter of the chemistry program. The names of all chapters concatined the letters "CH" like "Chapter 5".

The team had 3 challenges in relation to the URLS. The team needed to check if:
1. All the URLs were valid, meaning if they actually pointed to a ressource which exists
1. All URLs were unique, meaning if no single URL was assigned to different learning elements.
1. All the URLs were accessible from within Pakistan as Pakistan government uses internet filtering and may block access to certain ressources

To solve the above challenges, the team decided to use Google Script Editor to write a function in Javascript which would execute the above mentioned tasks.

### Checking Duplicates and existance duplicates.js

The team created a function called setduplicates. The function does:
1. List all the Google sheets containing the term "CH".
1. Loop through all the sheets and through all the lines which contain a URL
1. Build a JSON object containing as the key the URL and as content an array with all the sheets (chapters) and lines the URL appears
1. The duplicated URLs are those which contain more than 1 element in the array of the JSON object.
1. The duplicated URLs are then counted and printed onto the current worksheet

The JSON object had the following structure:
{
  "https://www.khanacademy.org/science/chemistry/atomic-structure-and-properties/introduction-to-the-atom/v/atomic-number-mass-number-and-isotopes" : [{chapter=Chapter I, line=16.0}, {chapter=Chapter II, line=19.0}]
  ...
  }
