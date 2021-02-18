# Creating Documentation in TechDocs

## General file structure

Each documentation component should follow the directory/file structure below.

```
/docs
  - index.md
  - another-section.md
mkdocs.yml
documentation-name.yaml
```

> :warning: `/docs`, `mkdocs.yml`, and `index.md` are strict naming requirements and are required by mkdocs to generate your documentation

The `/docs` directory contains the markdown files that make up your documentation. An `index.md` file is required as the initial entry point to your documentation project.

`mkdocs.yml` specifies how the documentation should be built and includes a `nav` property which allows you to configure docs navigation. Example below:

```yaml
# site_name and site_description are required
site_name: 'TechDocs'
site_description: 'TechDocs Documentation'

# required
plugins:
  - techdocs-core

# optional but recommended, if not provided
# mkdocs will automatically generate basic navigation
nav:
  - Introduction: index.md
  - Creating Documentation: creating-docs.md
```

Finally, you should create a yaml file that contains your documentation configuration. This file includes your documentation name, description, and a reference to where your docs are stored.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: 'TechDocs'
  description: 'TechDocs Documentation'
  annotations:
    github.com/project-slug: 'department-of-veterans-affairs/backstage'
    backstage.io/techdocs-ref: url:https://github.com/department-of-veterans-affairs/backstage/blob/API-5210-techdocs/documentation/techdocs
spec:
  type: documentation
  lifecycle: experimental
  owner: 'department-of-veterans-affairs/team-bilby'
```

## Standalone documentation component

## Using the documentation template

## Using an existing repo
