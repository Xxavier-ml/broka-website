
## Search analytics and trending terms

The storefront records only normalized submitted search phrases—never user IDs, IP addresses, or full browsing sessions. `/api/search-analytics` aggregates counts in the running web process and `/api/search-trending` ranks those phrases with the curated fallback list until enough activity exists. Analytics failures are intentionally ignored so search never breaks.

For durable cross-instance analytics in production, connect these two routes to a Railway-backed collector or analytics store. The current adapter is deliberately safe as a zero-configuration fallback, but its in-memory counts reset when the web process restarts or scales to a new instance.
