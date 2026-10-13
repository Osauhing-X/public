# Booking and Rent in Workspace v2

Booking manages services, weekly availability, locations and Website requests. Rent manages listings, resources, rental periods and requests. Both are package-owned workflows attached to Website.

## Setup

Install Website, Routes and the chosen module. Check manifest dependencies and attach the installed module instance. Add its declared import token to the route: `[import:booking]` or `[import:rent]`.

Create a service/listing, working hours or available resource, and clear customer instructions. Test the public request and inspect the saved private record.

## Request is not payment

A received request is not an approved reservation, signed contract or paid invoice. Booking's current package explicitly does not connect confirmation billing. Do not reuse v1 credit deductions or automatic-payment promises.

Check overlapping dates, staff and quantities before approval. State the timezone, price basis, response expectation and cancellation route. Keep internal notes out of public responses.

Test invalid dates, repeated submission, missing configuration and another module instance. Add notifications or payment only when the particular installed workflow actually implements and verifies them.

