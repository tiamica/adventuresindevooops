# Contributing to Adventures in DevOOPS

Thank you for your interest in contributing to Adventures in DevOOPS! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Code Style](#code-style)
- [Testing](#testing)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/adventuresindevooops.git`
3. Add the original repository as an upstream remote: `git remote add upstream https://github.com/ORIGINAL_OWNER/adventuresindevooops.git`
4. Keep your fork up to date: `git fetch upstream && git merge upstream/main`

## Development Environment

To set up your development environment:

1. Ensure you have a modern web browser (Chrome, Firefox, Edge, etc.)
2. No specific server is required for basic development - you can open `index.html` directly in your browser
3. For more advanced development, you may want to set up a local server:
   - Using Node.js: `npx http-server`
   - Using Python: `python -m http.server`
4. If adding new dependencies, please discuss in an issue first

## Branching Strategy

- `main` - Represents the stable release version
- `develop` - Integration branch for ongoing development
- `feature/feature-name` - For new features
- `bugfix/bug-description` - For bug fixes
- `release/version` - For release preparation
- `hotfix/description` - For critical fixes to production

## Commit Guidelines

Follow these guidelines for your commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line
- Consider using a structure like:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding or refactoring tests
  - `chore:` for maintenance tasks

## Pull Request Process

1. Create your feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'feat: Add some amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Submit a pull request to the `develop` branch
5. Ensure your PR includes:
   - A clear description of the changes
   - Any relevant issue numbers using keywords like "Fixes #123"
   - Documentation updates if needed
6. Address any review comments or requested changes
7. Once approved, your PR will be merged

## Reporting Bugs

When reporting bugs, please include:

1. A clear, descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Your browser and operating system
7. Any relevant console errors

Use the issue templates if available.

## Feature Requests

For feature requests:

1. Check if the feature has already been requested
2. Clearly describe the feature and its benefits
3. Provide examples of how the feature would be used
4. Indicate if you're willing to help implement it

## Code Style

- Use descriptive variable and function names
- Comment your code, especially for complex logic
- Follow JavaScript best practices
- Consider compatibility with modern browsers
- Keep functions small and focused on a single responsibility
- Use consistent indentation (spaces preferred)

## Testing

- Test your changes in different browsers if making UI changes
- Report any performance issues you discover
- Consider edge cases and error handling

Thank you for contributing to Adventures in DevOOPS!
