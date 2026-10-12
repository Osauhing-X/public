# Verify a customer workflow

V2 connects applications, modules and service actions. A good interface explains what happened; a working implementation proves the same result in persistent state or the responsible provider.

## Trace one complete journey

1. Open the public application logged out.
2. Find the service, page or product.
3. Submit a disposable request or use a payment sandbox.
4. Check the correct installed module instance.
5. Verify any promised message or provider result.
6. Reload and confirm the result survives.
7. Check errors and correlation information in logs.

A form submission, approval and payment are distinct events. Never mark an order paid merely because the browser reached a success URL.

## Error and access tests

Try invalid input, missing settings, expired access, a second instance and repeated submission. Do not expose another customer's record by changing an ID. Preserve drafts and explain an uncertain save result rather than encouraging a blind retry.

## Responsibilities

Core owns installation and administration. The application owns its public access rules. The module owns its business validation. The integration owns scoped provider actions. The operator owns backups and acceptance testing.

Customer account and invoice management for Extaas belongs to OUX Self-service, not an assumed v1 tenant portal.
