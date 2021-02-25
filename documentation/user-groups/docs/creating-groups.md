# Creating a Group

Groups are defined using YAML files similar to other Software Catalog entities.

## Required fields

A full list of fields/values for Groups can be found [here](https://backstage.io/docs/features/software-catalog/descriptor-format#kind-group).

| Field           | Value                    |
| --------------- | ------------------------ |
| `apiVersion`    | `backstage.io/v1alpha1`  |
| `kind`          | `Group`                  |
| `metadata.name` | `[name-of-group]`        |
| `spec.type`     | `[type-of-group]`        |
| `spec.children` | `[ [group1], [group2] ]` |

### `apiVersion` and `kind`

Required by all entity types. Set exactly equal to `backstage.io/v1alpha1` and `Group`, respectively.

### `metadata.name`

The name of the group. Example: `team-bilby`

### `spec.type`

_From the backstage docs:_

The type of group as a string, e.g. `team`. There is currently no enforced set of values for this field, so it is left up to the adopting organization to choose a nomenclature that matches their org hierarchy.

### `spec.children`

An array of immediate child groups to the parent group. Child groups should have a `spec.parent` field that points to the parent group.

## Example

```yaml
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: va-backstage
  namespace: department-of-veterans-affairs
  description: Example of a backstage User Group
  annotations:
    github.com/project-slug: 'department-of-veterans-affairs/backstage'
    backstage.io/techdocs-ref: url:https://github.com/department-of-veterans-affairs/backstage/blob/master/documentation/user-groups
spec:
  type: team
  profile:
    displayName: va-backstage
    email: example@example.com
  children: []
```
