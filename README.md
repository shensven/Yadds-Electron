# Yadds

[![GitHub](https://img.shields.io/github/license/syntachiato/Yadds)](./LICENSE)
[![](https://img.shields.io/github/package-json/dependency-version/syntachiato/Yadds/dev/electron)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/syntachiato/Yadds/react)](./package.json)
[![Test](https://github.com/syntachiato/Yadds/actions/workflows/test.yml/badge.svg?branch=dev)](https://github.com/syntachiato/Yadds/actions/workflows/test.yml)

> [!CAUTION]
> The repository is no longer maintained

> [!NOTE]
> The project has switched to native SwiftUI for `macOS` / `iOS`
>
> New name & upcoming app → [Swads.app](https://swads.app)

## ✨ FEATURES

- [x] Cross-platform support (macOS, Windows, Linux)
- [x] Multi-language hot-switching (English, 简体中文, 繁體中文, 日本語 and etc.)
- [x] Dark mode
- [ ] Support Touch Bar (Mac only if available)
- [ ] Support for [Synology Secure Signin](https://www.synology.com/en-us/dsm/packages/SecureSignIn) passwordless login
- [x] Multi-account switching
- [ ] Automatic access to BitTorrent tracker list
- [ ] Download progress visualization

## 🔨 BUILD

### PREREQUISITES

- [Node 14](https://nodejs.org) or higher
- [npm 8](https://www.npmjs.com/package/npm) or higher

### STARTING DEVELOPMENT

Start the app in the `dev` mode:

```bash
npm run start
```

### PACKAGING FOR PRODUCTION

To package apps for the local platform:

```bash
npm run package
```

## 👀 PREVIEW

 <img src="./screenshots/hero_early_preview.png" />

## 👍 CREDITS

- [Electron React Boilerplate - A Foundation for Scalable Cross-Platform Apps](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- [3dicons - Open source 3D icon library](https://3dicons.co/)

## 📜 LICENSE

GPL-3.0 License
