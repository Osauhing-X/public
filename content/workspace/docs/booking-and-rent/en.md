# Booking and Rent in Workspace v2

Booking manages services, weekly availability, locations and Website requests. Rent manages listings, locations, an entered available quantity and requests containing the customer's requested rental period. These are Website-compatible modules; this does not imply automatic inventory reservation or prevention of overlapping rental periods.

## Setup

Install Website, Routes and the chosen module. Check manifest dependencies and attach the installed module instance. Add its declared import token to the route: `[import:booking]` or `[import:rent]`.

Create a service/listing, working hours or available resource, and clear customer instructions. Test the public request and inspect the saved private record.

## Request is not payment

A received request is not an approved reservation, signed contract or paid invoice. Current Booking and Rent packages do not connect confirmation billing; Rent refuses approval until its billing workflow is implemented. Do not reuse v1 credit deductions or automatic-payment promises.

Check overlapping dates, staff and quantities before approval. State the timezone, price basis, response expectation and cancellation route. Keep internal notes out of public responses.

Test invalid dates, repeated submission, missing configuration and another module instance. Add notifications or payment only when the particular installed workflow actually implements and verifies them.

