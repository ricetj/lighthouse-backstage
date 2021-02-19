# TechDocs

TechDocs is Spotify’s homegrown docs-like-code solution built directly into Backstage. This means engineers write their documentation in Markdown files which live together with their code.

The basic configuration should already be set up for you but you can check the following properties in your `app-config.local.yaml` file if TechDocs are not loading:

```yaml
techdocs:
  requestUrl: http://localhost:7000/api/techdocs
  storageUrl: http://localhost:7000/api/techdocs/static/docs
  builder: 'local'
  # generators.techdocs should be set to 'docker'
  generators:
    techdocs: 'docker'
  publisher:
    type: 'local'
```
