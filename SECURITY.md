# Security Policy

## Dependency Vulnerabilities

This project has been audited for security vulnerabilities. As of March 2025, there are some known vulnerabilities in development dependencies, particularly:

- Several vulnerabilities in `react-performance-testing` (v2.0.0) and its dependencies
- Minor vulnerabilities in utility packages

### Production vs Development Scope

It's important to note:

1. **Production Impact**: The critical vulnerabilities are isolated to development and testing tools, not production code. The deployed application for end users is not affected.

2. **Decision Process**: I've made a conscious decision to maintain the current version of `react-performance-testing` to preserve our performance testing infrastructure, as newer versions have breaking API changes.

3. **Risk Assessment**: The vulnerabilities pose minimal risk as they only affect developer environments and aren't present in the built application served to users.

## Addressed Vulnerabilities

I've mitigated lower-risk vulnerabilities by updating packages that can be safely upgraded without breaking changes:

```bash
npm install ip@latest --save
npm install braces@latest --save-dev
```

## Reporting Security Issues

If you discover any security issues in this application, please report them by [creating an issue](https://github.com/Francisco1904/little-lemon-app-full/issues) with the label "security".
