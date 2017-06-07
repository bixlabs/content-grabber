# Content grabber API

Very basic implementation of a content grabber, just clone, install deps and start.

The content that is found inside the tags h1, h2 and h3 and the links (<a>).

## Environment vars
You can change the environment values below, in order to change the port or the mongodb database

    PORT=3000
    DATABASE_URL=mongodb://localhost/content_grabber

## Data store
Uses mongodb as data store.

## Endpoints
### List grabbed content

    GET /pages
    
    [
        {
            "_id": "...",
            "url": "http://...",
            "content": {
                "_id": "...",
                "a": [
                    {
                        "text": "...",
                        "href": "..."
                    }
                ]
                "h1": "...",
                "h3: [
                    "..."
                ]
            }
        }
    ]
    
### Grab the content of an url

    POST /pages
    
    {
        "url": "http://..." 
    }