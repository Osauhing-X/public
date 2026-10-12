# Module reference

Workspace v2 modules are installed tools with instance-owned configuration and state. They may provide a private interface, public content to a compatible application, or both.

Start with [module selection](/en/docs/modules-overview). For implementation, follow [create a module](/en/docs/create-module).

Required integrations and application capabilities are declared in the manifest. A copied package is not automatically enabled on every application or publicly visible. Verify the installed instance, attachment and data scope.

Core's private modules can persist state without a general Supabase requirement. The manifest of the actual package determines its dependencies.
