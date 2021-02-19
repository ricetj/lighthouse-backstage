# Creating Documentation in TechDocs

## General file structure

Each project should follow the directory/file structure below.

```
/docs
  - index.md
  - another-section.md
mkdocs.yml
documentation-name.yaml
```

> :warning: `/docs`, `mkdocs.yml`, and `index.md` are strict naming requirements and are required by MkDocs to generate your documentation

### /docs directory

The `/docs` directory contains the markdown files that make up your documentation. An `index.md` file is required as the initial entry point to your documentation project.

### mkdocs.yml

`mkdocs.yml` specifies how the documentation should be built and includes a `nav` property which allows you to configure docs navigation. Example below:

```yaml
# site_name and site_description are required
site_name: 'TechDocs'
site_description: 'TechDocs Documentation'

# required plugin for techdocs generator
plugins:
  - techdocs-core

# optional but recommended, if not provided
# mkdocs will automatically generate basic navigation
nav:
  - Introduction: index.md
  - Creating Documentation: creating-docs.md
```

### [documentation-title].yaml

> :warning: Note that the documentation title YAML file uses the .yaml file extension. Backstage expects config files to use the .yaml extension, while MkDocs expects the .yml extension

Finally, you should create a YAML file that contains your project configuration. This file includes your documentation name (title), description, and a reference to where your docs are stored.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: 'TechDocs'
  description: 'TechDocs Documentation'
  annotations:
    github.com/project-slug: 'department-of-veterans-affairs/backstage'
    # location of your project, can also be a relative url
    # example: dir:./
    backstage.io/techdocs-ref: url:https://github.com/department-of-veterans-affairs/backstage/blob/master/documentation/techdocs
spec:
  type: documentation
  lifecycle: experimental
  owner: 'department-of-veterans-affairs/team-bilby'
```

## Using the Documentation Template Generator

> :warning: WIP, documentation template generator seems flaky
