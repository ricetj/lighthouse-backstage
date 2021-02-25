# Users

Users also exist as Software Catalog Entities similar to Groups. They are connected to the authentication process and require certain entity fields to match the [auth identity](#metadata.name).

## Required fields

A full list of fields/values for Users can be found [here](https://backstage.io/docs/features/software-catalog/descriptor-format#kind-user).

| Field           | Value                    |
| --------------- | ------------------------ |
| `apiVersion`    | `backstage.io/v1alpha1`  |
| `kind`          | `User`                   |
| `metadata.name` | `[name-of-user]`         |
| `spec.memberOf` | `[ [group1], [group2] ]` |

### `apiVersion` and `kind`

Required by all entity types. Set exactly equal to `backstage.io/v1alpha1` and `User`, respectively.

### `metadata.name`

The users name. This name is tied to the auth process and should match the identity provided by authentication. For example, if GitHub is used to authenticate then `metadata.name` should match your GitHub username.

### `spec.memberOf`

An array of groups that the user is a member of.

## Example

A User can be defined in a separate YAML file or included with the Group that they are associated with. Multiple entities in a single file should be separated with `---`.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: backstage
  namespace: department-of-veterans-affairs
  description: Example of a backstage User Group
  annotations:
    github.com/project-slug: 'department-of-veterans-affairs/backstage'
    backstage.io/techdocs-ref: url:https://github.com/department-of-veterans-affairs/backstage/blob/master/documentation/user-groups
spec:
  type: team
  profile:
    displayName: va-backstage
    email: example@example.us
  children: []
---
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: testUser1
spec:
  profile:
    displayName: testUser1
  memberOf: [department-of-veteran-affairs/backstage]
---
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: testUser2
spec:
  profile:
    displayName: testUser2
  memberOf: [department-of-veteran-affairs/backstage]
```
