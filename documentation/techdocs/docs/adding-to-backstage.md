# Adding your TechDocs project to backstage

## Static configuration of documentation

TechDocs can be added to backstage directly by adding a reference to the repository url in the `app-config.yaml` file. Example:

```yaml
catalog:
  rules:
    - allow: [Component, API, Group, User, Template, Location]
  locations:
    # static documentation component
    - type: url
      target: https://github.com/department-of-veterans-affairs/backstage/blob/master/documentation/techdocs/techdocs.yaml
```

## Registering via Catalog Import

You can also use the Catalog Import plugin to register a TechDocs project. Simply navigate to http://localhost:3000/catalog-import and follow the instructions in the UI.

## Adding a TechDocs reference to a Service Catalog Component

Each component in the Backstage Service Catalog can be documented via TechDocs.

<img width="632" alt="Screen Shot 2021-02-18 at 7 59 26 PM" src="https://user-images.githubusercontent.com/9746156/108455935-0993c380-7224-11eb-9fa2-d845956bec07.png">

In order to associate a specific TechDocs project with a Service Catalog component you should add the following property to the `catalog-info.yaml` file for the component:

```yaml
metadata:
  annotations:
    backstage.io/techdocs-ref: url:https://github.com/department-of-veterans-affairs/path/to/techdocs/project
```

Adding that `metadata` property to an existing component in the service catalog should automatically add your documentation project to the service catalog as well.
