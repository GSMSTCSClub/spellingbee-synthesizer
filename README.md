# spelling bee synthesizer

I made this for my school's spelling bee.

it uses the Google Cloud TTS API, service worker, and Google Apps Scripts to automate the pronunciation of words via an endpoint on a server.

the implementation was super jank. I created a REST API that can be queried from the URL, which makes security basically nonexistent.
